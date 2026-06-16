"use client";

import { useEffect } from "react";

/**
 * Reference-counted body scroll lock that is safe for iOS Safari.
 *
 * Multiple consumers (NavBar mobile menu, CartDrawer, etc.) can each
 * call useScrollLock(true) independently.  The body is only unlocked
 * when *every* consumer has released its lock.
 *
 * iOS Safari ignores `overflow: hidden` on <body>.  The only reliable
 * technique is to set `position: fixed; width: 100%` on the body and
 * save / restore the scroll position.
 */

let lockCount = 0;
let savedScrollY = 0;

function lock() {
  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  }
  lockCount++;
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, savedScrollY);
  }
}

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (active) {
      lock();
      return () => unlock();
    }
  }, [active]);
}
