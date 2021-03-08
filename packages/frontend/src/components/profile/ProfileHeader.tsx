import React from 'react';

import { IProfileHeaderProps } from './types';

const ProfileHeader: React.FC<IProfileHeaderProps> = ({
  avatar,
  location,
  name,
  role,
}) => {
  return (
    <div className="profile__header">
      <div>
        <img draggable={false} src={avatar}></img>
      </div>
      <div className="profile__header__info">
        <h1>{name}</h1>
        <div className="profile__header__info__detail">
          <span>{role}</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
