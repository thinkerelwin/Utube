import React from 'react';
import { Subscription } from './Subscription/Subscription';
import { SideBarHeader } from '../SideBarHeader/SideBarHeader';

export const Subscriptions = () => (
  <>
    <SideBarHeader title="Subscriptions" />
    <Subscription label="MusicChannel" broadcasting />
    <Subscription label="freeCodeCamp" amountNewVideos={10} />
    <Subscription label="Udemy" amountNewVideos={4} />
    <Subscription label="Frontend Masters" amountNewVideos={23} />
    <Subscription label="Academnd" amountNewVideos={16} />
  </>
);
