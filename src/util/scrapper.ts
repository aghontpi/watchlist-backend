import fetch from 'node-fetch';
import parse, { HTMLElement } from 'node-html-parser';

export const apirespone = async () => {
  const response = await fetch('https://www.imdb.com/chart/top/', {
    timeout: 15 * 1000,
  });
  const htmlFile = response.status === 200 ? await response.text() : false;

  let list, root;
  if (htmlFile) {
    root = parse(htmlFile);
    list = root.querySelectorAll('tbody.lister-list tr')?.map((item) => {
      if (!item) {
        return;
      }
      const _poster = item.querySelector('.posterColumn img');
      const imgSrc = _poster?.getAttribute('src');
      const posterInfo = {
        poster: imgSrc?.slice(0, imgSrc.indexOf('_V1')) + '_SY720_.jpg',
        alt: _poster?.getAttribute('alt'),
        ...parseBaseInfo(item),
      };
      return posterInfo;
    });
  }

  return htmlFile ? list : htmlFile;
};

interface poster {
  poster: string;
  alt: string;
}

interface movieItem {
  rank: number;
  name: string;
  poster: poster;
  year: string;
  shortCrewList: string;
  rating: string;
}

type BasicInfo = Omit<movieItem, 'poster'>;

const parseBaseInfo = (root: HTMLElement): BasicInfo => {
  const titleColumn = root.querySelector('.titleColumn');
  const rank = titleColumn.structuredText.split('.')[0];
  const name = titleColumn.querySelector('a').structuredText;
  const year = titleColumn.querySelector('.secondaryInfo').structuredText.replace(/\(|\)/, '');
  let shortCrewList = titleColumn?.querySelector('a')?.getAttribute('title');
  !shortCrewList && (shortCrewList = '');
  const rating = root.querySelector('.ratingColumn.imdbRating')?.structuredText;
  return {
    ...{ rank: parseInt(rank), name, year, shortCrewList, rating },
  };
};
