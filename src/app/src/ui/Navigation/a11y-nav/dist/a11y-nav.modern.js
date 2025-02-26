function t() {
  return (
    (t = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var s = arguments[e];
            for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n]);
          }
          return t;
        }),
    t.apply(this, arguments)
  );
}
class e {
  constructor(e, s) {
    (this.nav = void 0),
      (this.options = void 0),
      (this.controls = void 0),
      (this.menus = void 0),
      (this.focusables = void 0),
      (this.nav = e),
      (this.options = {
        animate: !0,
        duration: 300,
        useArrowKeys: !0,
        closeOnBlur: !0,
        bodyClass: 'a11y-nav-menu-open',
        focusOnOpen: !0,
      }),
      (this.controls = this.getControls()),
      (this.menus = this.controls.map((t) => t.menu)),
      (this.focusables = this.getFocusables()),
      (this.options = t({}, this.options, s)),
      (this.onButtonClick = this.onButtonClick.bind(this)),
      (this.onButtonKeyDown = this.onButtonKeyDown.bind(this)),
      (this.onFocusableKeyDown = this.onFocusableKeyDown.bind(this)),
      (this.onBlur = this.onBlur.bind(this)),
      this.init();
  }
  init() {
    this.controls.forEach((t) => {
      t.menu.el.classList.add('a11y-nav-menu'),
        t.menu.el.setAttribute('tabindex', '-1'),
        t.el.addEventListener('click', this.onButtonClick),
        t.el.addEventListener('keydown', this.onButtonKeyDown),
        'true' === t.el.getAttribute('aria-expanded') && this.openMenu(t.menu, !0);
    }),
      this.focusables.forEach((t) => {
        t.addEventListener('keydown', this.onFocusableKeyDown);
      }),
      this.options.closeOnBlur && this.nav.addEventListener('focusout', this.onBlur),
      this.nav.dispatchEvent(new CustomEvent('init', { detail: this }));
  }
  onButtonClick(t) {
    const e = t.currentTarget,
      s = this.controls.find((t) => t.el === e),
      n = 'true' === (null == s ? void 0 : s.el.getAttribute('aria-expanded'));
    null != s && s.menu && this.toggleMenu(s.menu, !n);
  }
  onButtonKeyDown(t) {
    const e = this.getControlFromEl(t.target);
    if (!e) return;
    const s = 'true' === e.el.getAttribute('aria-expanded');
    if ('Escape' === t.key)
      if (s) this.closeMenu(e.menu);
      else {
        const t = e.el.closest('.a11y-nav-active');
        if (t) {
          const e = this.getMenuFromEl(t);
          e
            ? (e.control.el.focus(), this.closeMenu(e))
            : (this.focusables[0].focus(), this.closeAllMenus());
        } else this.focusables[0].focus(), this.closeAllMenus();
      }
    else if ('ArrowDown' === t.key && s) {
      var n;
      t.preventDefault(), null == (n = e.menu.el.querySelector('a, button')) || n.focus();
    } else {
      const s = this.focusables.filter(
          (t) => this.getMenuDepthFromEl(t) === this.getMenuDepthFromEl(e.el)
        ),
        n = s.findIndex((t) => t === e.el);
      this.options.useArrowKeys &&
        this.controlFocusByKey(
          t,
          s.map((t) => t),
          n
        );
    }
  }
  onFocusableKeyDown(t) {
    const e = this.getFocusableFromEl(t.target);
    if (!e) return;
    if (this.controls.find((t) => t.el === e)) return;
    if ('Escape' === t.key) {
      const t = e.closest('.a11y-nav-active');
      if (t) {
        const e = this.getMenuFromEl(t);
        e
          ? (e.control.el.focus(), this.closeMenu(e))
          : (this.focusables[0].focus(), this.closeAllMenus());
      } else this.focusables[0].focus(), this.closeAllMenus();
    }
    const s = this.focusables.filter(
        (t) => this.getMenuDepthFromEl(t) === this.getMenuDepthFromEl(e)
      ),
      n = s.findIndex((t) => t === e);
    this.options.useArrowKeys &&
      this.controlFocusByKey(
        t,
        s.map((t) => t),
        n
      );
  }
  onBlur(t) {
    !this.nav.contains(t.relatedTarget) &&
      this.nav.querySelector('.a11y-nav-active') &&
      this.closeAllMenus();
  }
  controlFocusByKey(t, e, s) {
    switch (t.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        t.preventDefault(), s > -1 && e[Math.max(0, s - 1)].focus();
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        t.preventDefault(), s > -1 && e[Math.min(e.length - 1, s + 1)].focus();
    }
  }
  toggleMenu(t, e) {
    e ? this.openMenu(t) : this.closeMenu(t);
  }
  openMenu(t, e = !1) {
    var s;
    this.nav.dispatchEvent(new CustomEvent('beforeOpen', { detail: { a11yNav: this, menu: t } })),
      this.menus.forEach((e) => {
        e.el !== t.el &&
          e.el.classList.contains('a11y-nav-active') &&
          this.getMenuDepthFromEl(e.el) === this.getMenuDepthFromEl(t.el) &&
          this.closeMenu(e);
      }),
      t.el.classList.add('a11y-nav-active'),
      t.control.el.setAttribute('aria-expanded', 'true'),
      null == (s = t.el.parentElement) || s.classList.add('a11y-nav-child-open'),
      'string' == typeof this.options.bodyClass &&
        this.options.bodyClass.length > 0 &&
        document.body.classList.add(this.options.bodyClass),
      this.options.animate
        ? (t.el.classList.add('a11y-nav-animate-in'),
          !e &&
            this.options.focusOnOpen &&
            setTimeout(() => {
              t.el.focus({ preventScroll: !0 }),
                this.nav.dispatchEvent(
                  new CustomEvent('afterOpen', { detail: { a11yNav: this, menu: t } })
                );
            }, this.options.duration))
        : !e &&
          this.options.focusOnOpen &&
          (t.el.focus({ preventScroll: !0 }),
          this.nav.dispatchEvent(
            new CustomEvent('afterOpen', { detail: { a11yNav: this, menu: t } })
          ));
  }
  closeMenu(t) {
    if (!t.el.classList.contains('a11y-nav-active')) return;
    this.nav.dispatchEvent(new CustomEvent('beforeClose', { detail: { a11yNav: this, menu: t } })),
      t.el.querySelectorAll('.a11y-nav-menu').forEach((t) => {
        const e = this.getMenuFromEl(t);
        e && this.closeMenu(e);
      });
    const e = () => {
      var e;
      const s = this.menus.some((e) => e.el.classList.contains('a11y-nav-active') && e.el !== t.el);
      'string' != typeof this.options.bodyClass ||
        s ||
        document.body.classList.remove(this.options.bodyClass),
        t.el.classList.remove('a11y-nav-active'),
        null == (e = t.el.parentElement) || e.classList.remove('a11y-nav-child-open'),
        this.nav.dispatchEvent(
          new CustomEvent('afterClose', { detail: { a11yNav: this, menu: t } })
        );
    };
    t.control.el.setAttribute('aria-expanded', 'false'),
      this.options.animate
        ? (t.el.classList.remove('a11y-nav-animate-in'),
          t.el.classList.add('a11y-nav-animate-out'),
          setTimeout(() => {
            e(), t.el.classList.remove('a11y-nav-animate-out');
          }, this.options.duration))
        : e();
  }
  closeAllMenus() {
    this.menus.forEach((t) => {
      this.closeMenu(t);
    }),
      'string' == typeof this.options.bodyClass &&
        document.body.classList.remove(this.options.bodyClass);
  }
  getMenuDepthFromEl(t) {
    let e = 0,
      s = t.parentElement;
    for (; s && s !== this.nav; )
      (s.classList.contains('a11y-nav-menu') || s === this.nav) && e++, (s = s.parentElement);
    return e;
  }
  getMenuFromEl(t) {
    var e;
    return null != (e = this.menus.find((e) => e.el === t)) ? e : null;
  }
  getControlFromEl(t) {
    var e;
    return null != (e = this.controls.find((e) => e.el === t)) ? e : null;
  }
  getFocusableFromEl(t) {
    var e;
    return null != (e = this.focusables.find((e) => e === t)) ? e : null;
  }
  getControls() {
    return Array.from(this.nav.querySelectorAll('button[aria-expanded][aria-controls]'))
      .map((t) => {
        const e = t.getAttribute('aria-controls'),
          s = document.getElementById(null != e ? e : '');
        if (s) {
          const e = { el: t, menu: { el: s, id: s.id, hadTabIndex: s.hasAttribute('tabindex') } };
          return (e.menu.control = e), e;
        }
        return null;
      })
      .flatMap((t) => (t ? [t] : []));
  }
  getFocusables() {
    return Array.from(this.nav.querySelectorAll('a, button'));
  }
  destroy() {
    this.closeAllMenus(),
      this.controls.forEach((t) => {
        t.menu.el.classList.remove('a11y-nav-menu'),
          t.menu.hadTabIndex || t.menu.el.removeAttribute('tabindex'),
          t.el.removeEventListener('click', this.onButtonClick),
          t.el.removeEventListener('keydown', this.onButtonKeyDown);
      }),
      this.focusables.forEach((t) => {
        t.removeEventListener('keydown', this.onFocusableKeyDown);
      }),
      this.nav.removeEventListener('focusout', this.onBlur),
      this.nav.dispatchEvent(new CustomEvent('destroy', { detail: { a11yNav: this } }));
  }
}
export { e as default };
//# sourceMappingURL=a11y-nav.modern.js.map
