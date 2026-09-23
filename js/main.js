(() => {
  "use strict";

  /* ------------------------------------------------------------ */
  /* Album data                                                    */
  /* ------------------------------------------------------------ */
  const albums = [
    {
      id: 5,
      title: "Songs from the Edge of Nowhere",
      year: 2026,
      spotifyId: "2iXZSIDnxlI4nW5wmcyYLL",
      cover: "bilder/covers/album5.webp",
      tracks: [
        "Let Me Die Where I Loved You",
        "The Fire Was Never Yours",
        "Now Love Is Ash",
        "What I Won't Say",
        "Borrowed Queen",
        "Black Ground Hallelujah",
        "Taj Mahal in the Dark",
        "King of Dust",
        "Build Your Cathedral In Me"
      ],
      videoTracks: [1]
    },
    {
      id: 4,
      title: "More Stories to Tell",
      year: 2026,
      spotifyId: "4R8tIQRnCLnBqd4cJ4S67h",
      cover: "bilder/covers/album4.webp",
      tracks: [
        "Burn Holy (Jeanne d'Arc)",
        "Boudica",
        "Banner Over Valencia",
        "Forty Seven Ronin",
        "Shaka",
        "Still It Turns (Galileo)",
        "Such Is Life (Ned Kelly)",
        "We Chose the Fall"
      ],
      videoTracks: []
    },
    {
      id: 3,
      title: "I'll Tell You a Story",
      year: 2026,
      spotifyId: "4o4yMdUEdWxZhvSciX2Zm3",
      cover: "bilder/covers/album3.webp",
      tracks: [
        "The Mississippi Knows It All",
        "The River Knows the Name",
        "The Alamo (Dust Remembers)",
        "The Last Fire of the Yahi",
        "Fear Was All",
        "Samuel de Champlain – Dream of New France",
        "Black Birds Cry"
      ],
      videoTracks: []
    },
    {
      id: 2,
      title: "A Soul Walks Home at Midnight",
      year: 2026,
      spotifyId: "1toYFdaeTUy8P7GVNxgS9x",
      cover: "bilder/covers/album2.webp",
      tracks: [
        "A Soldier Came Home",
        "Cathedral of Breath",
        "Embers of the Alley Crown",
        "Hold Me Like You Mean It",
        "Let Me Be",
        "Where the Levee Keeps Quiet",
        "Your Footsteps"
      ],
      videoTracks: [2]
    },
    {
      id: 1,
      title: "Darker Than Water",
      year: 2026,
      spotifyId: "5zWutJYWJa1PtuI3tVZi0Z",
      cover: "bilder/covers/album1.webp",
      tracks: [
        "Ain't Walkin' Alone",
        "Bad-man Suit",
        "Borrowed Breath",
        "Crown & Tiara",
        "Deep Water Mercy",
        "Good Man in Disguise",
        "Not Yet",
        "Porchlight Dawn",
        "Stand Alone",
        "Two Shadows, One Hymn"
      ],
      videoTracks: []
    }
  ];

  /* ------------------------------------------------------------ */
  /* Header: scrolled state + active link + mobile menu            */
  /* ------------------------------------------------------------ */
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-50% 0px -45% 0px" }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* ------------------------------------------------------------ */
  /* Scroll-reveal                                                 */
  /* ------------------------------------------------------------ */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ------------------------------------------------------------ */
  /* Discography grid                                              */
  /* ------------------------------------------------------------ */
  const grid = document.getElementById("discogGrid");
  const frag = document.createDocumentFragment();

  albums.forEach((album) => {
    const btn = document.createElement("button");
    btn.className = "album-card reveal is-visible";
    btn.type = "button";
    btn.setAttribute("data-album-id", album.id);
    btn.setAttribute("aria-haspopup", "dialog");
    btn.innerHTML = `
      <span class="album-art">
        <img src="${album.cover}" alt="${album.title} — album cover" width="1000" height="1000" loading="lazy" />
        <span class="play-hint" aria-hidden="true"><svg><use href="#icon-play"/></svg></span>
      </span>
      <span class="album-info">
        <span class="album-title">${album.title}</span><br />
        <span class="album-year">${album.year}</span>
      </span>
    `;
    frag.appendChild(btn);
  });
  grid.appendChild(frag);

  /* ------------------------------------------------------------ */
  /* Album modal                                                   */
  /* ------------------------------------------------------------ */
  const modal = document.getElementById("albumModal");
  const modalCover = document.getElementById("modalCover");
  const modalTitle = document.getElementById("modalTitle");
  const modalYear = document.getElementById("modalYear");
  const modalTracklist = document.getElementById("modalTracklist");
  const modalEmbedWrap = document.getElementById("modalEmbedWrap");
  let lastFocused = null;

  function openAlbumModal(album) {
    lastFocused = document.activeElement;
    modalCover.src = album.cover;
    modalCover.alt = `${album.title} — album cover`;
    modalTitle.textContent = album.title;
    modalYear.textContent = album.year;
    modalTracklist.innerHTML = album.tracks
      .map((track, i) => {
        const hasVideo = album.videoTracks.includes(i);
        return `<li${hasVideo ? ' class="has-video"' : ""}>${track}</li>`;
      })
      .join("");
    modalEmbedWrap.innerHTML = `<iframe title="Spotify player — ${album.title}" src="https://open.spotify.com/embed/album/${album.spotifyId}?utm_source=generator&theme=0" width="100%" height="352" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>`;

    modal.classList.add("is-open");
    document.body.classList.add("nav-open");
    modal.querySelector(".modal-close").focus();
  }

  function closeAlbumModal() {
    modal.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    modalEmbedWrap.innerHTML = "";
    if (lastFocused) lastFocused.focus();
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-album-id]");
    if (!card) return;
    const album = albums.find((a) => String(a.id) === card.getAttribute("data-album-id"));
    if (album) openAlbumModal(album);
  });

  modal.querySelectorAll("[data-modal-close]").forEach((el) => {
    el.addEventListener("click", closeAlbumModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeAlbumModal();
    }
  });

  /* ------------------------------------------------------------ */
  /* Click-to-load YouTube facades                                 */
  /* ------------------------------------------------------------ */
  document.querySelectorAll(".video-frame").forEach((frame) => {
    const load = () => {
      const videoId = frame.getAttribute("data-video-id");
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.title = frame.getAttribute("aria-label") || "YouTube video player";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      frame.innerHTML = "";
      frame.appendChild(iframe);
    };
    frame.addEventListener("click", load);
    frame.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        load();
      }
    });
  });

  /* ------------------------------------------------------------ */
  /* Footer year                                                   */
  /* ------------------------------------------------------------ */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
