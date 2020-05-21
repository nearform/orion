!(function() {
  'use strict'
  const e = self.console
  const n = Object.freeze({ NONE: 0, ERROR: 1, WARN: 2, INFO: 3, LOG: 4 })
  const t = ['error', 'warn', 'info', 'log']
  const o =
    void 0 !== e &&
    void 0 !== e.log &&
    void 0 !== e.error &&
    void 0 !== e.debug &&
    void 0 !== e.warn &&
    typeof Function.prototype.apply === 'function'
  let r = void 0
  let i = void 0
  const a = function(n, t, o, r) {
    return e[t]
      ? o
        ? e[t](o)
        : e[t]()
      : n.log('----------- ' + (o || r) + ' ----------- ')
  }

  const l = function(n) {
    let i = n.level
    var l = {
      setLevel(e) {
        return (i = e), l
      },
      getLevel() {
        return i || r
      },
    }
    return (
      t.forEach(function(n) {
        l[n] = function() {
          for (var r = arguments.length, i = new Array(r), a = 0; a < r; a++)
            i[a] = arguments[a]
          return (function(n, r, i) {
            if (o) {
              const a = t.indexOf(r)
              const l = n.getLevel()
              return ~a && l >= a + 1 && e[r].apply(e, i), n
            }
          })(l, n, i)
        }
      }),
      (l.groupCollapsed = function(e) {
        return a(l, 'groupCollapsed', e, 'GROUP START')
      }),
      (l.group = function(e) {
        return a(l, 'group', e, 'GROUP START')
      }),
      (l.groupEnd = function() {
        return a(l, 'groupEnd', null, 'GROUP END')
      }),
      (l.debug = l.log),
      l
    )
  }

  const s = function() {
    const e =
      arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
    e.level = e.level || n.NONE
    const t = e.newInstance || !i ? l(e) : i
    return i || e.newInstance || (i = t), t
  }

  const d = 'ML_WIDGET_INIT'
  const u = 'ML_WIDGET_SHOW'
  const c = 'ML_WIDGET_HIDE'
  const f = 'ML_WIDGET_ERROR'
  const p = 'ML_WIDGET_INSERT_DATA'
  const g = 'ML_WIDGET_EXPOSE_IDENTITY'
  const v = [
    'cloud_name',
    'api_key',
    'username',
    'timestamp',
    'signature',
    'integration',
  ]
  const y = ['access_token', 'redirect_url', 'cloud_name']
  const m = [
    'integration',
    'inline_container',
    'z_index',
    'multiple',
    'max_files',
    'default_transformations',
    'insert_caption',
    'remove_header',
    'folder',
    'search',
    'collection',
    'asset',
    'transformation',
    'sandboxNotAllowedAttributes',
  ]
  const b = [
    'allow-forms',
    'allow-modals',
    'allow-orientation-lock',
    'allow-pointer-lock',
    'allow-popups',
    'allow-popups-to-escape-sandbox',
    'allow-presentation',
    'allow-same-origin',
    'allow-scripts',
    'allow-top-navigation',
    'allow-top-navigation-by-user-activation',
  ]
  const h = s()
  const w = function(e, n) {
    let t = null
    try {
      t = typeof e === 'string' ? JSON.parse(e) : e
    } catch (error) {
      h.error('[postmessage]: failed to parse data from ' + n, error)
    }

    return t
  }

  const _ = function(e, n, t) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = t),
      e
    )
  }

  const E =
    Object.assign ||
    function(e) {
      for (let n = 1; n < arguments.length; n++) {
        const t = arguments[n]
        for (const o in t)
          Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
      }

      return e
    }

  const O =
    (s(),
    function(e) {
      return new Promise(function(n, t) {
        let o
        let r = !1
        const i = (function(e, n) {
          let t = void 0
          const o = Array.isArray(n.allowedOrigin)
            ? n.allowedOrigin
            : [n.allowedOrigin]
          const r = n.types
          const i = function(e) {
            if (!e || !e.length) throw 'PostMessage - target not set!'
          }

          const a = function(e) {
            if (~o.indexOf(e.origin)) {
              t = e.origin
              const i = w(e.data, e.origin)
              i &&
                ((n.validator && !n.validator(i.data)) ||
                  (i.type &&
                    r[i.type] &&
                    (h.log(
                      "[postmessage]: found matching handler for '" +
                        i.type +
                        "' event from: " +
                        e.origin,
                      i.data
                    ),
                    r[i.type](i.data, i.type, e, n))))
            }
          }

          return (
            i(o),
            self.addEventListener('message', a, !1),
            {
              send(n, o) {
                const r =
                  (arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {}
                  ).target || t
                i(r)
                try {
                  h.log('[postmessage]: posting message to: ' + r),
                    e instanceof HTMLIFrameElement && (e = e.contentWindow),
                    e.postMessage(JSON.stringify({ type: n, data: o }), r)
                } catch (error) {
                  h.error(
                    '[postmessage]: failed to post message to target: ' + r,
                    error
                  )
                }
              },
              close() {
                return self.removeEventListener('message', a)
              },
            }
          )
        })(e.ifr, {
          validator(n) {
            return n && n.mlId && n.mlId === e.mlId
          },
          allowedOrigin: e.mlUrl.origin,
          types:
            ((o = {}),
            _(o, p, function(n) {
              e.callbacks.insertHandler && e.callbacks.insertHandler(n)
            }),
            _(o, g, function(n) {
              e.callbacks.identityHandler && e.callbacks.identityHandler(n)
            }),
            _(o, c, function() {
              e.callbacks.hideHandler()
            }),
            _(o, f, function(n) {
              e.callbacks.errorHandler && e.callbacks.errorHandler(n)
            }),
            o),
        })
        const a = function(n, t) {
          i.send(n, t, { target: e.mlUrl.origin })
        }

        e.ifr.addEventListener('load', function() {
          r || ((r = !0), e.iframeLoaded(), n({ sendMessage: a }))
        }),
          self.addEventListener(
            'message',
            function(n) {
              const t = w(n)
              w(t.data).type === 'consoleLoaded' && a(d, e)
            },
            !1
          ),
          e.ifr.addEventListener('error', function() {})
      })
    })
  !(function(e) {
    let t
    let o = 0
    e.location.search.includes('debug=true') && ((t = n.LOG), (r = t))
    const i = function(n, t, r) {
      let i = void 0
      let a = void 0
      let l = null
      let s = !1
      let d = !1
      const f = Boolean(n.inline_container)
      let p = null
      const g = Boolean(n.access_token)
      const h = 'ml_' + o
      o += 1
      const w = function(e) {
        e.keyCode === 27 && R.hide()
      }

      const L =
        'https://' +
        (!0 === n.dev
          ? 'dev.cloudinary.com'
          : !0 === n.nightly
          ? 'nightly.cloudinary.com'
          : !0 === n.staging
          ? 'staging.cloudinary.com'
          : 'cloudinary.com')
      const A = function(e, n, t) {
        let o
        const r =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
        const i =
          ((o = []),
          Object.keys(r).forEach(function(e) {
            return o.push(e + '=' + r[e])
          }),
          t
            .filter(function(e) {
              return Boolean(n[e])
            })
            .forEach(function(e) {
              return o.push(e + '=' + encodeURIComponent(n[e]))
            }),
          o)
        const a = L + e + '?' + i.join('&')
        return { origin: L, href: a }
      }

      const I = function(e) {
        window.requestAnimationFrame(function() {
          a.style.padding = e.matches ? '25px' : '25px 0'
        })
      }

      const x = function(e) {
        const n = f ? i : a
        ;(function(e) {
          let n = document.body
          if (
            (f &&
              typeof (n = e.inline_container) === 'string' &&
              (n = document.querySelector(n)),
            !n)
          )
            throw 'Element Not Found (' + e.inline_container + ')'
          return n
        })(e).appendChild(n),
          i.focus()
      }

      const k = function() {
        const n = f ? i : a
        d && s
          ? ((n.style.visibility = 'visible'),
            n.focus(),
            !f && e.document.addEventListener('keyup', w))
          : ((n.style.visibility = 'hidden'),
            e.document.removeEventListener('keyup', w))
      }

      const M = function() {
        ;(d = !0), k()
      }

      const T = function() {
        !f &&
          document.body &&
          (p === null && (p = document.body.style.overflow),
          (document.body.style.overflow = 'hidden')),
          (s = !0),
          k()
      }

      const H = function() {
        !f &&
          document.body &&
          p !== null &&
          ((document.body.style.overflow = p), (p = null)),
          (s = !1),
          k()
      }

      const N = f
        ? t.insertHandler
        : function(e) {
            t.insertHandler(e), H()
          }

      !(function() {
        const o = E({}, n)
        const s = o.sandboxAttributes
        let d = self.location
        d.origin === 'null' && (d = new URL(self.origin))
        let u
        let c
        let p
        let w
        let L
        let k
        const R = A(
          '/console/media_library/cms',
          o,
          v,
          E(
            { pmHost: d.protocol + '//' + d.host, new_cms: !0, ml_id: h },
            ((u = s),
            Array.isArray(u) && !u.includes('allow-popups')
              ? { sandbox_no_popup: !0 }
              : {})
          )
        )
        const D = g
          ? A(
              '/console/api/v1/auth/login_with_oauth_token',
              E({}, n, { redirect_url: R.href }),
              y
            ).href
          : R.href
        ;(o.mlUrl = R),
          (o.callbacks = t),
          s &&
            (o.sandboxNotAllowedAttributes = (function(e) {
              let n = []
              return (
                Array.isArray(e) &&
                  (n = b.filter(function(n) {
                    return !e.includes(n)
                  })),
                n
              )
            })(s)),
          r &&
            ((c = typeof (w = r) === 'string' ? document.querySelector(w) : w),
            (p = e.document.createElement('button')),
            (c.style.display = 'none'),
            p.setAttribute('class', n.button_class || 'cloudinary-button'),
            (p.innerHTML = n.button_caption || 'Open Media Library'),
            c.parentNode.insertBefore(p, c.previousSibling),
            p.addEventListener(
              'click',
              function(e) {
                return (
                  T(),
                  e && e.preventDefault && e.preventDefault(),
                  e && e.stopPropagation && e.stopPropagation(),
                  !1
                )
              },
              !1
            )),
          (function(t) {
            if (
              ((i = e.document.createElement('iframe')).setAttribute('src', t),
              i.setAttribute('frameborder', 'no'),
              i.setAttribute('allow', 'camera'),
              f
                ? (i.setAttribute('width', '100%'),
                  i.setAttribute('height', '100%'),
                  (i.style.border = 'none'))
                : (i.setAttribute('width', '100%'),
                  i.setAttribute('height', '100%'),
                  (i.style.boxShadow = '0 0 50px rgba(0, 0, 0, 0.8)')),
              !f)
            ) {
              if (
                (((a = e.document.createElement('div')).style.position =
                  'fixed'),
                (a.style.top = '0'),
                (a.style.left = '0'),
                (a.style.height = '100%'),
                (a.style.width = '100%'),
                (a.style.boxSizing = 'border-box'),
                (a.style.backgroundColor = 'rgba(0,0,0,0.5)'),
                (a.style.zIndex = n.z_index || 99999),
                matchMedia)
              ) {
                const o = window.matchMedia('(min-width: 700px)')
                o.addListener(I), I(o)
              }

              ;(a.style.visibility = 'hidden'), a.appendChild(i)
            }
          })(D),
          (l = O({
            ifr: i,
            mlId: h,
            mlUrl: R,
            callbacks: E({}, t, { insertHandler: N, hideHandler: H }),
            iframeLoaded: M,
            config:
              ((L = o),
              (k = m),
              k.reduce(function(e, n) {
                return void 0 !== L[n] ? E({}, e, _({}, n, L[n])) : e
              }, {})),
          })),
          x(o)
      })()

      var R = {
        show() {
          const e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
          return (
            l.then(function(n) {
              n.sendMessage(u, {
                mlId: h,
                options: E({}, e, { config: e }),
                config: e,
              }),
                T()
            }),
            this
          )
        },
        hide() {
          return (
            l.then(function(e) {
              e.sendMessage(c, { mlId: h }), H()
            }),
            this
          )
        },
      }
      return R
    }

    ;(e.cloudinary = e.cloudinary || {}),
      (e.cloudinary.openMediaLibrary = function(e, n, t) {
        return i(e, n, t).show(e)
      }),
      (e.cloudinary.createMediaLibrary = function(e, n, t) {
        return i(e, n, t)
      })
  })(self)
})()
