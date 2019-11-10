'use strict';

const url = new URL(window.location.href);
const theme = url.searchParams.get('theme') || 'youtube';

const $ = s => document.querySelector(s);

const makeLink = label => {
    if (!label) {
        return '<div class="menu-separator"></div>';
    }

    return '<div class="menu-link">' + label + '</div>';
};

const makeCardItem = (thing) => {
    if (typeof thing === 'string') {
        return `<div class="card-section-title">${thing}</div>`;
    }

    let [src, title, cite, blurb] = thing;

    if (Array.isArray(blurb)) {
       blurb = blurb.map(link => `<span class="blurb-link">${link}</span>`).join(' ');
    }

    return (`
    <div class="card">
        <div class="thumbnail" style="background-image: url('${src}');"></div>
        <div class="content">
            <div class="title">${title}</div>
            <div class="cite">${cite.split(', ').join(' &middot; ')}</div>
            <div class="blurb">${blurb}</div>
        </div>
    </div>
    `);
};

$('#logo').src = '/logos/' + theme + '.png';

fetch(`/menus/${theme}.json`).then(f => f.json()).then(menuData => {
   $('aside').innerHTML = menuData.map(makeLink).join('\n');
});

fetch(`/content/${theme}.json`).then(f => f.json()).then(content => {
    $('main').innerHTML = content.map(makeCardItem).join('\n');
});

// setTimeout(() => window.location.reload(true), 5000);