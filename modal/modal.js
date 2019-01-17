var DEBUG = false;
var DEBUG_FREQUENCY = 0;
var DEBUG_EXTENSION_ID = "ficgohjocaglohbngehdmkiggddjlocb";

var socialmodule_instance = null;

function dlog(msg) {
    if (DEBUG === true) {
        return console.log(msg);
    }
    return;
}

class SocialModule {
    constructor() {
        if (!socialmodule_instance) {
            socialmodule_instance = this;
        }
        this.created_at = new Date();
        this.bodyDOM = document.querySelector('body');
        this.listeners = {
            "clickInstallNow": (e) => {
                return false;
            },
            "clickShareFB": (e) => {
                return false;
            },
            "clickRateNow": (e) => {
                return false;
            },
            "clickRateLater": (e) => {
                return false;
            },
            "clickRateNever": (e) => {
                return false;
            }
        };
        return socialmodule_instance;
    }
    get apiURL() {
        return `http://social.apihub.info/v1.php`;
    }
    get expireInterval() {
        return 30 * 1000;
    }
    get expireIntervalLater() {
        return 10 * 60 * 1000;
    }
    get demoFrequency() {
        return DEBUG ? DEBUG_FREQUENCY : 0 * 1000;
    }
    getMessage(msg_id) {
        var msgs = {
            'share': (chrome.i18n && chrome.i18n.getMessage("socialmoduleShare")) || 'Share',
            'fbshare': (chrome.i18n && chrome.i18n.getMessage("socialmoduleShareInFB")) || 'Share on Facebook',
            'rateus': (chrome.i18n && chrome.i18n.getMessage("socialmoduleRateUs")) || 'Rate Us',
            'ratenow': (chrome.i18n && chrome.i18n.getMessage("socialmoduleRateNow")) || 'Rate Now',
            'ratelater': (chrome.i18n && chrome.i18n.getMessage("socialmoduleLater")) || 'Later',
            'ratenever': (chrome.i18n && chrome.i18n.getMessage("socialmoduleNever")) || 'No, thanks',
            'more': (chrome.i18n && chrome.i18n.getMessage("socialmoduleMoreExtensions")) || 'You Might Like...',
            'installnow': (chrome.i18n && chrome.i18n.getMessage("socialmoduleInstallNow")) || 'Install Now'
        };
        return msgs[msg_id] || "";
    }
    getModalWindowBasic(_id, _header_title) {
        var smd_popup = document.createElement('div');
        smd_popup.className = "socialmodule_popup";
        var smd_modal_open = document.createElement('input');
        smd_modal_open.className = "socialmodule_modal-open";
        smd_modal_open.id = `socialmodule_modal-${_id}`;
        smd_modal_open.setAttribute('type', 'checkbox');
        smd_modal_open.setAttribute('hidden', true);
        smd_popup.appendChild(smd_modal_open);
        var smd_modal_overlay = document.createElement('label');
        smd_modal_overlay.className = "socialmodule_modal-overlay";
        smd_modal_overlay.setAttribute('for', `socialmodule_modal-${_id}`);
        smd_popup.appendChild(smd_modal_overlay);
        var smd_modal = document.createElement('div');
        smd_modal.className = `socialmodule_modal socialmodule_modal-${_id}`;
        var smd_modal_wrap = document.createElement('div');
        smd_modal_wrap.className = "socialmodule_modal-wrap";
        smd_modal_wrap.setAttribute('aria-hidden', true);
        smd_modal_wrap.setAttribute('role', 'dialog');
        var smd_header_title = document.createElement('p');
        smd_header_title.className = "socialmodule_header_title";
        smd_header_title.textContent = _header_title;
        smd_modal_wrap.appendChild(smd_header_title);
        var smd_btn_close = document.createElement('label');
        smd_btn_close.className = "socialmodule_btn-close";
        smd_btn_close.setAttribute('for', `socialmodule_modal-${_id}`);
        smd_btn_close.setAttribute('aria-hidden', true);
        var smd_svg_close = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        smd_svg_close.setAttribute('width', '12');
        smd_svg_close.setAttribute('height', '12');
        smd_svg_close.setAttribute("viewBox", "0 0 12 12");
        smd_svg_close.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        var smd_svg_path_close = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        smd_svg_path_close.setAttributeNS(null, 'd', 'M6.93 6.17l4.4 4.4-1.1 1.1-4.4-4.4L1.6 11.5.5 10.4l4.23-4.23-4.4-4.4 1.1-1.1 4.4 4.4L10.4.5l1.1 1.1-4.57 4.57z');
        smd_svg_path_close.setAttributeNS(null, 'fill', '#C1C1C1');
        smd_svg_path_close.setAttributeNS(null, 'fill-rule', 'evenodd');
        smd_svg_close.appendChild(smd_svg_path_close);
        smd_btn_close.appendChild(smd_svg_close);
        smd_modal_wrap.appendChild(smd_btn_close);
        smd_modal.appendChild(smd_modal_wrap);
        smd_popup.appendChild(smd_modal);
        this.bodyDOM.appendChild(smd_popup);
        return {
            'wrapDOM': smd_modal_wrap,
            'openDOM': smd_modal_open
        };
    }

    appendFBShare() {
        var smd_obj = this.getModalWindowBasic(1, this.getMessage('share'));
        var smd_modal_body = document.createElement('div');
        smd_modal_body.className = "socialmodule_modal-body socialmodule_fb_share";
        var smd_svg_fb = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        smd_svg_fb.className.baseVal = "socialmodule_svg_fb";
        smd_svg_fb.setAttribute('width', '40');
        smd_svg_fb.setAttribute('height', '40');
        smd_svg_fb.setAttribute("viewBox", "0 0 40 40");
        smd_svg_fb.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        var smd_svg_path_fb = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        smd_svg_path_fb.setAttributeNS(null, 'd', 'M34.61 0H5.39A5.39 5.39 0 0 0 0 5.39v29.22A5.39 5.39 0 0 0 5.39 40h14.411l.025-14.294h-3.714a.876.876 0 0 1-.876-.873l-.018-4.607a.876.876 0 0 1 .876-.88h3.707v-4.452c0-5.166 3.156-7.98 7.764-7.98h3.782c.484 0 .877.393.877.877v3.885a.876.876 0 0 1-.876.876l-2.321.001c-2.506 0-2.992 1.191-2.992 2.939v3.854h5.508c.525 0 .932.458.87.98l-.546 4.607a.876.876 0 0 1-.87.773H26.06L26.035 40h8.575A5.39 5.39 0 0 0 40 34.61V5.39A5.39 5.39 0 0 0 34.61 0');
        smd_svg_path_fb.setAttributeNS(null, 'fill', '#FFF');
        smd_svg_path_fb.setAttributeNS(null, 'fill-rule', 'evenodd');
        smd_svg_fb.appendChild(smd_svg_path_fb);
        smd_modal_body.appendChild(smd_svg_fb);
        var smd_fb_title = document.createElement('p');
        smd_fb_title.className = "socialmodule_fb_title";
        smd_fb_title.textContent = this.getMessage('fbshare');
        smd_modal_body.appendChild(smd_fb_title);
        this.listeners["clickShareFB"] = (e) => {
            e.preventDefault();
            window.open(`http://www.facebook.com/share.php?u=${encodeURIComponent('https://chrome.google.com/webstore/detail/' + this.extension.id)}`,
                'FB_SHARE_WINDOW', 'height=450, width=550, top=' + (window.height / 2 - 275) + ', left=' + (window.width / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
            smd_obj.openDOM.checked = false;
            return false;
        };
        smd_modal_body.addEventListener('click', this.listeners["clickShareFB"])
        smd_obj.wrapDOM.appendChild(smd_modal_body);
    }

    appendRateUs() {
        var smd_obj = this.getModalWindowBasic(2, this.getMessage('rateus'));
        var smd_modal_body = document.createElement('div');
        smd_modal_body.className = "socialmodule_modal-body";
        var smd_rate_now = document.createElement('div');
        smd_rate_now.className = "socialmodule_rate_now";
        var smd_svg_rate = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        smd_svg_rate.className.baseVal = "socialmodule_svg_rate";
        smd_svg_rate.setAttribute('width', '28');
        smd_svg_rate.setAttribute('height', '30');
        smd_svg_rate.setAttribute("viewBox", "0 0 28 30");
        smd_svg_rate.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        var smd_svg_path_rate = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        smd_svg_path_rate.setAttributeNS(null, 'd', 'M27.108 16.766A5.167 5.167 0 0 0 28 13.83c0-1.238-.46-2.315-1.384-3.229-.925-.912-2.018-1.37-3.282-1.37h-3.209C20.71 8.041 21 6.887 21 5.77c0-1.407-.213-2.524-.638-3.354a3.987 3.987 0 0 0-1.86-1.83C17.689.196 16.773 0 15.75 0c-.62 0-1.167.223-1.64.667-.524.505-.9 1.155-1.131 1.948a25.36 25.36 0 0 0-.556 2.28c-.139.727-.355 1.241-.647 1.541a34.988 34.988 0 0 0-1.95 2.308c-1.228 1.574-2.06 2.506-2.497 2.794H2.334a2.26 2.26 0 0 0-1.65.677c-.456.45-.684.995-.684 1.631v11.538c0 .638.227 1.181.684 1.632a2.26 2.26 0 0 0 1.65.676h5.25c.267 0 1.105.241 2.515.72 1.495.518 2.81.912 3.946 1.182 1.137.271 2.288.406 3.455.406h2.352c1.713 0 3.092-.484 4.137-1.452 1.046-.967 1.563-2.286 1.55-3.957.73-.926 1.094-1.995 1.094-3.209 0-.264-.018-.523-.054-.776.46-.804.692-1.67.692-2.595 0-.433-.054-.848-.163-1.245zM4.32 25.042a1.13 1.13 0 0 1-.82.342c-.316 0-.59-.114-.821-.342a1.102 1.102 0 0 1-.346-.812c0-.312.114-.582.346-.811a1.13 1.13 0 0 1 .82-.343c.316 0 .59.115.82.343.231.229.347.5.347.811 0 .314-.116.584-.346.812zm20.954-9.735c-.26.553-.586.836-.974.848.181.204.333.49.456.856.12.367.18.7.18 1 0 .829-.32 1.545-.965 2.146.22.384.329.799.329 1.244 0 .444-.107.886-.32 1.324-.212.439-.5.754-.866.947.062.36.091.697.091 1.009 0 2.007-1.167 3.01-3.5 3.01H17.5c-1.593 0-3.67-.438-6.235-1.315a19.083 19.083 0 0 0-.529-.19l-.647-.225c-.14-.048-.353-.117-.638-.207a10.289 10.289 0 0 0-.692-.199 8.532 8.532 0 0 0-.602-.117 3.765 3.765 0 0 0-.575-.054h-.582V13.847h.582c.195 0 .41-.055.648-.163.237-.108.48-.27.729-.486.249-.216.483-.43.702-.64.219-.21.461-.475.729-.794a34.938 34.938 0 0 0 1.203-1.505c.231-.3.371-.48.42-.541.668-.817 1.136-1.364 1.403-1.64.498-.517.86-1.175 1.084-1.974.226-.8.41-1.554.556-2.263.146-.709.377-1.22.694-1.533 1.167 0 1.945.283 2.332.848.39.565.584 1.436.584 2.614 0 .708-.292 1.673-.875 2.893-.584 1.22-.874 2.179-.874 2.876h6.416c.608 0 1.148.232 1.622.694.475.463.711 1 .711 1.613 0 .421-.13.908-.392 1.46z');
        smd_svg_path_rate.setAttributeNS(null, 'fill', '#FFF');
        smd_svg_path_rate.setAttributeNS(null, 'fill-rule', 'evenodd');
        smd_svg_rate.appendChild(smd_svg_path_rate);
        smd_rate_now.appendChild(smd_svg_rate);
        var smd_rate_now_title = document.createElement('p');
        smd_rate_now_title.className = "socialmodule_rate_now_title";
        smd_rate_now_title.textContent = this.getMessage('ratenow');
        smd_rate_now.appendChild(smd_rate_now_title);
        this.listeners["clickRateNow"] = (e) => {
            e.preventDefault();
            window.open(`https://chrome.google.com/webstore/detail/${this.extension.id}/reviews`, 'RateWindow', 'height=750, width=1050, top=' + (window.height / 2 - 275) + ', left=' + (window.width / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
            localStorage['socialmodule_never'] = true;
            smd_obj.openDOM.checked = false;
            return false;
        };
        smd_rate_now.addEventListener('click', this.listeners["clickRateNow"]);
        smd_modal_body.appendChild(smd_rate_now);
        var smd_rate_later = document.createElement('div');
        smd_rate_later.className = "socialmodule_rate_later";
        var smd_rate_later_title = document.createElement('p');
        smd_rate_later_title.className = "socialmodule_rate_later_title";
        smd_rate_later_title.textContent = this.getMessage('ratelater');
        smd_rate_later.appendChild(smd_rate_later_title);
        this.listeners["clickRateLater"] = (e) => {
            e.preventDefault();
            localStorage['socialmodule_later_date'] = Date.now();
            smd_obj.openDOM.checked = false;
            return false;
        };
        smd_rate_later.addEventListener('click', this.listeners["clickRateLater"]);
        smd_modal_body.appendChild(smd_rate_later);
        var smd_rate_never = document.createElement('div');
        smd_rate_never.className = "socialmodule_rate_never";
        var smd_rate_never_title = document.createElement('p');
        smd_rate_never_title.className = "socialmodule_rate_never_title";
        smd_rate_never_title.textContent = this.getMessage('ratenever');
        smd_rate_never.appendChild(smd_rate_never_title);
        this.listeners["clickRateLater"] = (e) => {
            e.preventDefault();
            localStorage['socialmodule_never'] = true;
            smd_obj.openDOM.checked = false;
            return false;
        };
        smd_rate_never.addEventListener('click', this.listeners["clickRateLater"]);
        smd_modal_body.appendChild(smd_rate_never);
        smd_obj.wrapDOM.appendChild(smd_modal_body);
    }

    save() {
        localStorage['socialmodule_config'] = JSON.stringify({
            show_probabilities: this.show_probabilities,
            see_also: this.see_also,
            opts: this.opts
        });
        localStorage['socialmodule_updated_at'] = Date.now();
    }
    load() {
        var config = undefined;
        try {
            if (localStorage['socialmodule_config']) {
                config = JSON.parse(localStorage['socialmodule_config']);
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
        return true;
    }
    initialize() {
        this.extension = {
            id: DEBUG ? DEBUG_EXTENSION_ID : chrome.i18n.getMessage('@@extension_id'),
            lang: chrome.i18n.getMessage('@@ui_locale'),
            title: chrome.i18n.getMessage("appName")
        };
        return new Promise((resolve, reject) => {
            if (this.load()) {
                if (Date.now() - localStorage['socialmodule_updated_at'] > this.expireInterval) {
                    resolve({
                        status: 'expired'
                    });
                } else {
                    reject({
                        status: 'exist'
                    });
                }
            } else {
                resolve({
                    status: 'loading'
                });
            }
        })
            .then(data => {
                return fetch(`${this.apiURL}?id=${this.extension.id}`, {
                    mode: 'cors'
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => {
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json();
                }
                throw new TypeError("Oops, we haven't got JSON!");
            })
            .then((json) => {
                dlog(json);
                return this.configurate(json);
            })
            .catch((error) => {
                dlog(error);
                if (error.status !== 'exist') {
                    return this.configurate();
                } else {
                    return this.configurate(JSON.parse(localStorage['socialmodule_config']));
                }
            });
    }
    configurate(config = {
        show_probabilities: [50, 50, 0],
        see_also: [],
        opts: [{
            name: "iwdelay",
            value: 0
        }]
    }) {
        try {
            this.show_probabilities = config.show_probabilities.slice(0);
            this.see_also = config.see_also.slice(0);
            this.opts = config.opts.slice(0);
        } catch (e) {
            this.show_probabilities = [50, 50, 0];
            this.see_also = [];
            this.opts = [{
                name: "iwdelay",
                value: 0
            }];
        } finally {
            this.save();
            this.appendFBShare();
            this.appendRateUs();
            return JSON.stringify(config);
        }
    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    CumulativeDistributionFunction() {
        var show_probs = this.show_probabilities.slice(0);
        var sum_prob = show_probs.reduce((accumulator, currentValue) => accumulator + currentValue);
        if ((localStorage["socialmodule_never"]) ||
            (Date.now() - localStorage["socialmodule_later_date"]) <= this.expireIntervalLater) {
            sum_prob -= show_probs[1];
            show_probs[1] = 0;
            show_probs[0] = parseInt((show_probs[0] / sum_prob) * 100);
            show_probs[2] = Math.sign(show_probs[2]) * (100 - show_probs[0]);
            sum_prob = show_probs[0] + show_probs[1] + show_probs[2];
        }
        return Promise.all(this.see_also.map((extension) => {
            return this.isInstalled(extension.extension_id)
        }))
            .then(installed => {
                this.see_also = this.see_also.filter((val, idx) => {
                    return !installed[idx].install;
                });
                if (this.see_also.length === 0) {
                    sum_prob -= show_probs[2];
                    show_probs[2] = 0;
                    show_probs[0] = parseInt((show_probs[0] / sum_prob) * 100);
                    show_probs[1] = Math.sign(show_probs[1]) * (100 - show_probs[0]);
                    sum_prob = show_probs[0] + show_probs[1] + show_probs[2];
                }
                var prob = this.getRandomInt(1, sum_prob + 1);
                if (prob <= show_probs[0]) {
                    return 1;
                } else if (prob <= show_probs[0] + show_probs[1]) {
                    return 2;
                } else if (prob <= show_probs[0] + show_probs[1] + show_probs[2]) {
                    return 3;
                }
                return -1;
            })
    }
    showSocial() {
        if (Date.now() - localStorage["socialmodule_lastshowed"] <= this.demoFrequency) {
            return false;
        }
        this.CumulativeDistributionFunction()
            .then(modalIdx => {
                for (var i = 1; i <= 3; i++) {
                    (this.show_probabilities[i - 1] > 0) && (document.querySelector(`#socialmodule_modal-${i}`).checked = false);
                }
                if (modalIdx > 0) {
                    localStorage["socialmodule_lastshowed"] = Date.now();
                    document.querySelector(`#socialmodule_modal-${modalIdx}`).checked = true;
                } else {
                    dlog('error');
                }
            })
    }
    isInstalled(extension_id) {
        return new Promise((resolve, reject) => {
            try {
                chrome.management.get(`${extension_id}`, ExtensionInfo => {
                    if (chrome.runtime.lastError) {
                        resolve({
                            eid: extension_id,
                            install: false
                        });
                    }
                    resolve({
                        eid: extension_id,
                        install: true
                    });
                });
            } catch (e) {
                reject({
                    message: "Unexpected Error"
                });
            }
        })
            .then(data => {
                return data;
            })
            .catch(error => {
                return {
                    eid: extension_id,
                    install: extension_id === this.extension.id
                };
            });
    }
}

var SocialModuleInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    SocialModuleInstance = new SocialModule();
    SocialModuleInstance.initialize()
        .then(response => {
            dlog(`SUCCESS data = ${response}`);
        })
        .catch(error => {
            dlog(error)
        });
});