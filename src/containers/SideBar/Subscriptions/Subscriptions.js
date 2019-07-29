import React from 'react';
import { Subscription } from './Subscription/Subscription';
import { SideBarHeader } from '../SideBarHeader/SideBarHeader';

export const Subscriptions = () => (
  <>
    <SideBarHeader title="Subscriptions" />
    <Subscription label="MusicChannel" broadcasting />
    <Subscription label="Coursea" amountNewVideos={10} />
    <Subscription label="TEDx Talks" amountNewVideos={23} />
    <Subscription label="Stanford iOS" amountNewVideos={4} />
    <Subscription label="Udacity" amountNewVideos={114} />
  </>
);
