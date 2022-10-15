import getMetaData from 'metadata-scraper';

const url = 'https://youtu.be/HGauFnYJj-k';
export const getMetaInfo = () => {
  getMetaData(url).then((data: any) => {
    console.log(data);
  });
};
getMetaInfo();
