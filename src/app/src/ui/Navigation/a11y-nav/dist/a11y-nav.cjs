function t() {
  return (
    (t = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
          }
          return t;
        }),
    t.apply(this, arguments)
  );
}
module.exports = /*#__PURE__*/ (function () {
  function e(e, n) {
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
      (this.menus = this.controls.map(function (t) {
        return t.menu;
      })),
      (this.focusables = this.getFocusables()),
      (this.options = t({}, this.options, n)),
      (this.onButtonClick = this.onButtonClick.bind(this)),
      (this.onButtonKeyDown = this.onButtonKeyDown.bind(this)),
      (this.onFocusableKeyDown = this.onFocusableKeyDown.bind(this)),
      (this.onBlur = this.onBlur.bind(this)),
      this.init();
  }
  var n = e.prototype;
  return (
    (n.init = function () {
      var t = this;
      this.controls.forEach(function (e) {
        e.menu.el.classList.add('a11y-nav-menu'),
          e.menu.el.setAttribute('tabindex', '-1'),
          e.el.addEventListener('click', t.onButtonClick),
          e.el.addEventListener('keydown', t.onButtonKeyDown),
          'true' === e.el.getAttribute('aria-expanded') && t.openMenu(e.menu, !0);
      }),
        this.focusables.forEach(function (e) {
          e.addEventListener('keydown', t.onFocusableKeyDown);
        }),
        this.options.closeOnBlur && this.nav.addEventListener('focusout', this.onBlur),
        this.nav.dispatchEvent(new CustomEvent('init', { detail: this }));
    }),
    (n.onButtonClick = function (t) {
      var e = t.currentTarget,
        n = this.controls.find(function (t) {
          return t.el === e;
        }),
        o = 'true' === (null == n ? void 0 : n.el.getAttribute('aria-expanded'));
      null != n && n.menu && this.toggleMenu(n.menu, !o);
    }),
    (n.onButtonKeyDown = function (t) {
      var e = this,
        n = this.getControlFromEl(t.target);
      if (n) {
        var o = 'true' === n.el.getAttribute('aria-expanded');
        if ('Escape' === t.key)
          if (o) this.closeMenu(n.menu);
          else {
            var s = n.el.closest('.a11y-nav-active');
            if (s) {
              var i = this.getMenuFromEl(s);
              i
                ? (i.control.el.focus(), this.closeMenu(i))
                : (this.focusables[0].focus(), this.closeAllMenus());
            } else this.focusables[0].focus(), this.closeAllMenus();
          }
        else if ('ArrowDown' === t.key && o) {
          var a;
          t.preventDefault(), null == (a = n.menu.el.querySelector('a, button')) || a.focus();
        } else {
          var l = this.focusables.filter(function (t) {
              return e.getMenuDepthFromEl(t) === e.getMenuDepthFromEl(n.el);
            }),
            u = l.findIndex(function (t) {
              return t === n.el;
            });
          this.options.useArrowKeys &&
            this.controlFocusByKey(
              t,
              l.map(function (t) {
                return t;
              }),
              u
            );
        }
      }
    }),
    (n.onFocusableKeyDown = function (t) {
      var e = this,
        n = this.getFocusableFromEl(t.target);
      if (
        n &&
        !this.controls.find(function (t) {
          return t.el === n;
        })
      ) {
        if ('Escape' === t.key) {
          var o = n.closest('.a11y-nav-active');
          if (o) {
            var s = this.getMenuFromEl(o);
            s
              ? (s.control.el.focus(), this.closeMenu(s))
              : (this.focusables[0].focus(), this.closeAllMenus());
          } else this.focusables[0].focus(), this.closeAllMenus();
        }
        var i = this.focusables.filter(function (t) {
            return e.getMenuDepthFromEl(t) === e.getMenuDepthFromEl(n);
          }),
          a = i.findIndex(function (t) {
            return t === n;
          });
        this.options.useArrowKeys &&
          this.controlFocusByKey(
            t,
            i.map(function (t) {
              return t;
            }),
            a
          );
      }
    }),
    (n.onBlur = function (t) {
      !this.nav.contains(t.relatedTarget) &&
        this.nav.querySelector('.a11y-nav-active') &&
        this.closeAllMenus();
    }),
    (n.controlFocusByKey = function (t, e, n) {
      switch (t.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          t.preventDefault(), n > -1 && e[Math.max(0, n - 1)].focus();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          t.preventDefault(), n > -1 && e[Math.min(e.length - 1, n + 1)].focus();
      }
    }),
    (n.toggleMenu = function (t, e) {
      e ? this.openMenu(t) : this.closeMenu(t);
    }),
    (n.openMenu = function (t, e) {
      var n,
        o = this;
      void 0 === e && (e = !1),
        this.nav.dispatchEvent(
          new CustomEvent('beforeOpen', { detail: { a11yNav: this, menu: t } })
        ),
        this.menus.forEach(function (e) {
          e.el !== t.el &&
            e.el.classList.contains('a11y-nav-active') &&
            o.getMenuDepthFromEl(e.el) === o.getMenuDepthFromEl(t.el) &&
            o.closeMenu(e);
        }),
        t.el.classList.add('a11y-nav-active'),
        t.control.el.setAttribute('aria-expanded', 'true'),
        null == (n = t.el.parentElement) || n.classList.add('a11y-nav-child-open'),
        'string' == typeof this.options.bodyClass &&
          this.options.bodyClass.length > 0 &&
          document.body.classList.add(this.options.bodyClass),
        this.options.animate
          ? (t.el.classList.add('a11y-nav-animate-in'),
            !e &&
              this.options.focusOnOpen &&
              setTimeout(function () {
                t.el.focus({ preventScroll: !0 }),
                  o.nav.dispatchEvent(
                    new CustomEvent('afterOpen', { detail: { a11yNav: o, menu: t } })
                  );
              }, this.options.duration))
          : !e &&
            this.options.focusOnOpen &&
            (t.el.focus({ preventScroll: !0 }),
            this.nav.dispatchEvent(
              new CustomEvent('afterOpen', { detail: { a11yNav: this, menu: t } })
            ));
    }),
    (n.closeMenu = function (t) {
      var e = this;
      if (t.el.classList.contains('a11y-nav-active')) {
        this.nav.dispatchEvent(
          new CustomEvent('beforeClose', { detail: { a11yNav: this, menu: t } })
        ),
          t.el.querySelectorAll('.a11y-nav-menu').forEach(function (t) {
            var n = e.getMenuFromEl(t);
            n && e.closeMenu(n);
          });
        var n = function () {
          var n,
            o = e.menus.some(function (e) {
              return e.el.classList.contains('a11y-nav-active') && e.el !== t.el;
            });
          'string' != typeof e.options.bodyClass ||
            o ||
            document.body.classList.remove(e.options.bodyClass),
            t.el.classList.remove('a11y-nav-active'),
            null == (n = t.el.parentElement) || n.classList.remove('a11y-nav-child-open'),
            e.nav.dispatchEvent(new CustomEvent('afterClose', { detail: { a11yNav: e, menu: t } }));
        };
        t.control.el.setAttribute('aria-expanded', 'false'),
          this.options.animate
            ? (t.el.classList.remove('a11y-nav-animate-in'),
              t.el.classList.add('a11y-nav-animate-out'),
              setTimeout(function () {
                n(), t.el.classList.remove('a11y-nav-animate-out');
              }, this.options.duration))
            : n();
      }
    }),
    (n.closeAllMenus = function () {
      var t = this;
      this.menus.forEach(function (e) {
        t.closeMenu(e);
      }),
        'string' == typeof this.options.bodyClass &&
          document.body.classList.remove(this.options.bodyClass);
    }),
    (n.getMenuDepthFromEl = function (t) {
      for (var e = 0, n = t.parentElement; n && n !== this.nav; )
        (n.classList.contains('a11y-nav-menu') || n === this.nav) && e++, (n = n.parentElement);
      return e;
    }),
    (n.getMenuFromEl = function (t) {
      var e;
      return null !=
        (e = this.menus.find(function (e) {
          return e.el === t;
        }))
        ? e
        : null;
    }),
    (n.getControlFromEl = function (t) {
      var e;
      return null !=
        (e = this.controls.find(function (e) {
          return e.el === t;
        }))
        ? e
        : null;
    }),
    (n.getFocusableFromEl = function (t) {
      var e;
      return null !=
        (e = this.focusables.find(function (e) {
          return e === t;
        }))
        ? e
        : null;
    }),
    (n.getControls = function () {
      return Array.from(this.nav.querySelectorAll('button[aria-expanded][aria-controls]'))
        .map(function (t) {
          var e = t.getAttribute('aria-controls'),
            n = document.getElementById(null != e ? e : '');
          if (n) {
            var o = { el: t, menu: { el: n, id: n.id, hadTabIndex: n.hasAttribute('tabindex') } };
            return (o.menu.control = o), o;
          }
          return null;
        })
        .flatMap(function (t) {
          return t ? [t] : [];
        });
    }),
    (n.getFocusables = function () {
      return Array.from(this.nav.querySelectorAll('a, button'));
    }),
    (n.destroy = function () {
      var t = this;
      this.closeAllMenus(),
        this.controls.forEach(function (e) {
          e.menu.el.classList.remove('a11y-nav-menu'),
            e.menu.hadTabIndex || e.menu.el.removeAttribute('tabindex'),
            e.el.removeEventListener('click', t.onButtonClick),
            e.el.removeEventListener('keydown', t.onButtonKeyDown);
        }),
        this.focusables.forEach(function (e) {
          e.removeEventListener('keydown', t.onFocusableKeyDown);
        }),
        this.nav.removeEventListener('focusout', this.onBlur),
        this.nav.dispatchEvent(new CustomEvent('destroy', { detail: { a11yNav: this } }));
    }),
    e
  );
})();
//# sourceMappingURL=a11y-nav.cjs.map
