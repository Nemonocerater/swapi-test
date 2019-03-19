
var axios = require('axios');

var { printAxiosError } = require('./helpers');

module.exports = class SWApi {
  constructor(startApi) {
    this.startApi = startApi;
    this.objects = [];
  }

  async queryAll() {
    let link = this.startApi;

    while (link) {
      let rsp = await axios.get(link);
      rsp.data.results.forEach(p => {
        this.objects.push(p);
      });

      link = null;
      if (rsp.data.next) {
        link = rsp.data.next;
      }
    }
  }

  async find(comp) {
    if (this.objects.length > 0) {
      return findInArray(this.objects, comp);
    }

    try {
      let link = this.startApi;
      while (link) {
        let rsp = await axios.get(link);
        let obj = findInArray(rsp.data.results, comp);

        if (obj !== null) {
          return obj;
        }

        link = null;
        if (rsp.data.next) {
          link = rsp.data.next;
        }
      }
    } catch (e) {
      printAxiosError(e);
      throw e;
    }

    return null;
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
