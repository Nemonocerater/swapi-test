
var axios = require('axios');

var { printAxiosError } = require('./helpers');

module.exports = class SWApi {
  constructor(startApi) {
    this.startApi = startApi;
    this.objects = [];
  }

  queryAll(cb) {
    this.querySwapi(this.startApi, cb);
  }

  querySwapi(link, cb) {
    axios.get(link)
      .then(rsp => {
        rsp.data.results.forEach(p => {
          this.objects.push(p);
        });

        if (rsp.data.next) {
          this.querySwapi(rsp.data.next, cb);
        } else if (cb) {
          cb();
        }
      })
      .catch(error => {
        printAxiosError("Error fetching " + link, error);
        process.exit();
      });
  }

  find(comp, isFound) {
    this.findInSwapi(this.startApi, comp, isFound);
  }

  findInSwapi(link, comp, isFound) {
    if (this.objects.length > 0) {
      return findInArray(this.objects, comp);
    }

    axios.get(link)
      .then(rsp => {
        let obj = findInArray(rsp.data.results, comp);

        if (obj !== null) {
          isFound(obj);
        } else if (rsp.data.next) {
          this.findInSwapi(rsp.data.next, comp, isFound);
        } else {
          isFound(null);
        }
      })
      .catch(error => {
        printAxiosError("Error finding at " + link, error);
        process.exit();
      });
  }
}

function findInArray(array, comp) {
  for (var i = 0; i < array.length; i++) {
    if (comp(array[i])) {
      return array[i];
    }
  }
  return null;
}
