import React from 'react';

const Link = ({className, href, children}) => {
  const onClick = (event) => {
    // 可以另開分頁
    if(event.metaKey || event.ctrlKey){
      return;
    }

    event.preventDefault();
    window.history.pushState({}, '', href);

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent); // 觸發事件
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  )
};

export default Link;