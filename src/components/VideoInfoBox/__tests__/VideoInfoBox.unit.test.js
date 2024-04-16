import { VideoInfoBox } from '../VideoInfoBox';
import { shallow, mount } from 'enzyme';
import React from 'react';

const mockData = {
  video: {
    id: 'TitZV6k8zfA',
    snippet: {
      publishedAt: '2024-04-14T22:41:37Z',
      channelId: 'UCBJycsmduvYEL83R_U4JriQ',
      title: "The Worst Product I've Ever Reviewed... For Now",
      description:
        "The Humane AI pin is... bad. Almost no one should buy it. Yet.\n\nMKBHD Merch: http://shop.MKBHD.com\n\nTech I'm using right now: https://www.amazon.com/shop/MKBHD\n\nIntro music: http://youtube.com/20syl\nPlaylist of MKBHD Intro music: https://goo.gl/B3AWV5\n\nPin provided by pin for review.\n\n~\nhttp://twitter.com/MKBHD\nhttp://instagram.com/MKBHD\nhttp://facebook.com/MKBHD\n\n0:00 What Is it?\n2:30 The Hardware\n4:26 What Does It Do?\n8:14 The Review (It's Bad)\n15:00 Smartphones are OP\n21:20 A Victim of Its Future Ambition",
      thumbnails: {
        medium: {
          url: 'https://i.ytimg.com/vi/TitZV6k8zfA/mqdefault.jpg',
          width: 320,
          height: 180,
        },
      },
      channelTitle: 'Marques Brownlee',
    },
    contentDetails: {
      duration: 'PT25M4S',
    },
    statistics: {
      viewCount: '3048797',
      likeCount: '114287',
      favoriteCount: '0',
      commentCount: '10146',
    },
  },
  channel: {
    id: 'UCBJycsmduvYEL83R_U4JriQ',
    snippet: {
      title: 'Marques Brownlee',
      description:
        'MKBHD: Quality Tech Videos | YouTuber | Geek | Consumer Electronics | Tech Head | Internet Personality!\n\nbusiness@MKBHD.com\n\nNYC',
      thumbnails: {
        medium: {
          url: 'https://yt3.ggpht.com/lkH37D712tiyphnu0Id0D5MwwQ7IRuwgQLVD05iMXlDWO-kDHut3uI4MgIEAQ9StK0qOST7fiA=s240-c-k-c0x00ffffff-no-rj',
          width: 240,
          height: 240,
        },
      },
    },
    statistics: {
      subscriberCount: '18600000',
    },
  },
};

describe('VideoInfoBox', () => {
  test('renders collapsed', () => {
    const wrapper = shallow(<VideoInfoBox />);
    expect(wrapper).toMatchSnapshot();
  });
  test('renders expanded', () => {
    const wrapper = mount(<VideoInfoBox {...mockData} />);
    wrapper.find('button.description-toggle').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
