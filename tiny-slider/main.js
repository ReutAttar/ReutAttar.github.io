var slider = tns({
  container: ".my-slider",
  items: 4,
  speed: 10000,
  autoplay: true,
  autoplayTimeout: 100,
  swipeAngle: false,
  responsive: {
    640: {
      edgePadding: 20,
      gutter: 20,
      items: 2,
    },
    700: {
      gutter: 30,
    },
    900: {
      items: 3,
    },
  },
});

slider.play();
