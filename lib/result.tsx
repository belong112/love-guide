import resultList from "@/src/result-list.json";

const loveTypeData = resultList.loveTypeData;
const MBTIData = resultList.MBTIData;
const loveWordData = resultList.loveWordData;

export function getAllResultIds() {
  var allPath = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 16; j++) {
      for (var k = 0; k < 5; k++) {
        allPath.push(i.toString() + "-" + j.toString() + "-" + k.toString());
      }
    }
  }

  return allPath.map((type) => {
    return {
      params: {
        id: type,
      },
    };
  });
}

export function getResultData(id: string) {
  var partsId = id.split("-");
  const resultData = {
    ...loveTypeData[parseInt(partsId[0])],
    ...MBTIData[parseInt(partsId[1])],
    ...loveWordData[parseInt(partsId[2])],
  };

  // Combine the data with the id
  return {
    id,
    ...resultData,
  };
}
