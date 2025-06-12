<template>
    <!-- 
        SVG ini berisi 3 logo: STIKes Bogor Husada, Kampus Merdeka, dan LAM-PTKes.
        viewBox "0 0 950 100" menentukan area gambar.
    -->
    <svg
        id="logo-gabungan"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 950 100"
        aria-labelledby="logoTitle logoDesc"
        role="img"
        style="width: 100%; height: auto; display: block;"
    >
        <title id="logoTitle">Logo Kemitraan STIKes Bogor Husada</title>
        <desc id="logoDesc">Logo STIKes Bogor Husada, Kampus Merdeka, dan LAM-PTKes</desc>
        <defs>
            <!-- <style>
                .sbh-main { fill: #003366; font-family: Arial, sans-serif; font-weight: bold; font-size: 24px; }
                .sbh-sub { fill: #003366; font-size: 12px; font-family: Arial, sans-serif; }
                .km-path { fill: #4A4A4A; }
                .km-title { fill: #231F20; font-family: Helvetica, Arial, sans-serif; font-weight: bold; font-size: 22px; }
                .km-sub { fill: #4A4A4A; font-size: 10px; }
                .lam-green { fill: #00A651; }
                .lam-blue { fill: #0071BC; }
                .divider { fill: none; stroke: #D1D5DB; stroke-width: 1.5; stroke-miterlimit: 10; }
            </style> -->
        </defs>

        <!-- Logo 1: STIKes Bogor Husada -->
        <g id="logo-sbh" transform="translate(20, 0)">
            <text x="0" y="58.5" class="sbh-main">STIKes Bogor Husada</text>
            <text x="0" y="80" class="sbh-sub">Profesional, Kompeten, Berkarakter</text>
        </g>

        <!-- Divider 1 -->
        <line class="divider" x1="370" y1="15" x2="370" y2="85" />

        <!-- Logo 2: Kampus Merdeka -->
        <g id="logo-kampus-merdeka" transform="translate(400, 25)">
            <path class="km-path"
                d="M32.8,49.2c-0.5,0-1-0.1-1.5-0.2c-2.3-0.8-3.9-2.8-4.2-5.2l-1-11.8c-0.1-1.5,0.9-2.8,2.4-2.9c1.5-0.1,2.8,0.9,2.9,2.4l1,11.8c0.1,1,0.8,1.8,1.8,2c1,0.1,1.9-0.5,2.2-1.4l5.3-13.3c0.6-1.4,2.2-2.1,3.6-1.5c1.4,0.6,2.1,2.2,1.5,3.6L39,47.8c-0.7,1.7-2.3,2.8-4.2,2.8C34.4,50.6,33.6,50.2,32.8,49.2z"
            />
            <path class="km-path"
                d="M51.1,50.6c-1.9,0-3.6-1.3-4.1-3.2L41.7,29c-0.6-2.2,0.8-4.4,3-5c2.2-0.6,4.4,0.8,5,3l5.3,18.4c0.5,1.6,1.9,2.7,3.5,2.7c1.6,0,3-1.1,3.5-2.7l5.3-18.4c0.6-2.2,2.8-3.6,5-3c2.2,0.6,3.6,2.8,3,5L69.8,47.4c-0.5,1.9-2.2,3.2-4.1,3.2c-1.8,0-3.3-1.1-3.9-2.8L60,42.5l-1.8,5.1C57.6,49.5,56,50.6,54.2,50.6C53.2,50.6,52.1,50.2,51.1,50.6z"
            />
            <g>
                <text x="85.3" y="32.3" class="km-title">KAMPUS</text>
                <text x="85.3" y="52.3" class="km-title">MERDEKA</text>
                <text x="200" y="52.3" class="km-sub">INDONESIA JAYA</text>
            </g>
        </g>

        <!-- Divider 2 -->
        <line class="divider" x1="710" y1="15" x2="710" y2="85" />

        <!-- Logo 3: LAM-PTKes -->
        <g id="logo-lamptkes" transform="translate(730, 8) scale(0.9)">
            <polygon class="lam-green" points="89.1,64.3 89.1,34.8 111,49.6" />
            <path class="lam-blue"
                d="M124.3,25.3v58.5h23.1V60.2h12.3v23.6h23.1V25.3H124.3z M159.8,49.6h-12.3V35.8h12.3V49.6z"
            />
            <path class="lam-blue"
                d="M49.5,0C22.2,0,0,22.2,0,49.5S22.2,99,49.5,99s49.5-22.2,49.5-49.5S76.8,0,49.5,0z M49.5,88.5 c-21.5,0-39-17.5-39-39s17.5-39,39-39s39,17.5,39,39S71,88.5,49.5,88.5z"
            />
        </g>
    </svg>
</template>
