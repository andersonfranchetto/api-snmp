'use strict'

const snmp = require('net-snmp');

async function getInfo(OID, VARIABLE_OID, printer) {
  var session = snmp.createSession(printer.ip_address, "public");
  var data = [];
  return await new Promise((resolve, reject) => {
    session.get(OID, function (error, varbinds) {
      if (error) {
        reject('Ip-Printer: ' + printer.ip_address + '\n' + error);
      }
      else {
        for (var i = 0; i < varbinds.length; i++) {
          if (snmp.isVarbindError(varbinds[i])) {
            console.error(snmp.varbindError(varbinds[i]));
          }
          else {
            data.push({
              name: VARIABLE_OID[i],
              value: varbinds[i].value.toString()
            });
          }
        }
      }
      resolve(data);
    });
  });
}

exports.collectDataOfPrinter = async (OID, VARIABLE_OID, printer) => {
  return await getInfo(OID, VARIABLE_OID, printer)
    .then(async (data) => {
      var result = {};
      // var mono, color, drum_life, drum_capacity;
      data.forEach(async info => {
        if (info.name === 'Printed Pages Mono')
          result.mono = info.value;
        if (info.name === 'Printed Pages Color')
          result.color = info.value;
        if (info.name === 'Drum Life')
          result.drum_life = info.value
        if (info.name === 'Drum Capacity')
          result.drum_capacity = info.value
      });

      return result;
    }).catch(error => console.log("Promises rejected: " + error));
}
