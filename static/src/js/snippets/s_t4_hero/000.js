/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

const AUTOPLAY_INTERVAL = 6000;

publicWidget.registry.sT4Hero = publicWidget.Widget.extend({
    selector: ".s_t4_hero",
    events: {
        "click [data-hero-prev]": "_onPrev",
        "click [data-hero-next]": "_onNext",
        "click [data-hero-dot]": "_onDot",
    },

    start() {
        this._current = 0;
        this._slides = this.el.querySelectorAll(".t4-hero-slide");
        this._dots = this.el.querySelectorAll(".t4-hero-dot");
        this._counter = this.el.querySelector(".t4-hero-current");
        this._total = this._slides.length;
        this._startAutoplay();
        return this._super(...arguments);
    },

    destroy() {
        this._stopAutoplay();
        this._super(...arguments);
    },

    _goTo(index) {
        this._slides[this._current].classList.remove("active");
        this._dots[this._current].classList.remove("active");
        this._current = (index + this._total) % this._total;
        this._slides[this._current].classList.add("active");
        this._dots[this._current].classList.add("active");
        if (this._counter) {
            this._counter.textContent = String(this._current + 1).padStart(2, "0");
        }
    },

    _onPrev() {
        this._stopAutoplay();
        this._goTo(this._current - 1);
        this._startAutoplay();
    },

    _onNext() {
        this._stopAutoplay();
        this._goTo(this._current + 1);
        this._startAutoplay();
    },

    _onDot(ev) {
        const index = parseInt(ev.currentTarget.dataset.heroDot, 10);
        this._stopAutoplay();
        this._goTo(index);
        this._startAutoplay();
    },

    _startAutoplay() {
        this._stopAutoplay();
        this._timer = setInterval(() => this._goTo(this._current + 1), AUTOPLAY_INTERVAL);
    },

    _stopAutoplay() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    },
});

export default publicWidget.registry.sT4Hero;
