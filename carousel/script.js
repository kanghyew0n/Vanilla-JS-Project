(function () {
  ("use strict");

  const get = (target) => {
    return document.querySelector(target);
  };

  class Carousel {
    constructor(carouselElement) {
      this.carouselElement = carouselElement;
      this.itemCLassName = "carousel_item";
      this.items = this.carouselElement.querySelectorAll(".carousel_item"); // 이미지 전체 받아오기

      this.totalItems = this.items.length; //5개
      this.current = 0; // 현재 이미지 위치
    }

    initCarousel() {
      // 초기 캐러셀 상태
      //
      this.items[this.totalItems - 1].classList.add("prev");
      this.items[0].classList.add("active");
      this.items[1].classList.add("next");
    }

    setEventListeners() {
      // 버튼 두개 가져와서 onCLick 이벤트 주기
      this.prevButton = this.carouselElement.querySelector(
        ".carousel_button--prev"
      );
      this.nextButton = this.carouselElement.querySelector(
        ".carousel_button--next"
      );

      this.prevButton.addEventListener("click", () => {
        this.movePrev();
      });
      this.nextButton.addEventListener("click", () => {
        this.moveNext();
      });
    }

    moveCarouselTo() {
      // if (!this.isMoving) {
      // this.disableInteraction();

      let prev = this.current - 1; // 현재 이미지 위치 -1
      let next = this.current + 1; // 현재 이미지 위치 +1

      // 5 <= 1, 2, 3, 4, 5 => 1 : 연결
      if (this.current === 0) {
        // 첫번째 이미지면 prev는 5번쩨 이미지
        prev = this.totalItems - 1;
      } else if (this.current === this.totalItems - 1) {
        // 마지막(5번재) 이미지면 next는 첫번째
        next = 0;
      }

      for (let i = 0; i < this.totalItems; i++) {
        // 이미지 전체 돌리면서
        if (i === this.current) {
          //
          this.items[i].className = this.itemCLassName + " active";
        } else if (i === prev) {
          this.items[i].className = this.itemCLassName + " prev";
        } else if (i === next) {
          this.items[i].className = this.itemCLassName + " next";
        } else {
          this.items[i].className = this.itemCLassName;
        }
      }
      // }
    }

    moveNext() {
      if (this.current === this.totalItems - 1) {
        this.current = 0;
      } else {
        this.current++;
      }

      this.moveCarouselTo();
    }

    movePrev() {
      if (this.current === 0) {
        this.current = this.totalItems - 1;
      } else {
        this.current--;
      }
      this.moveCarouselTo();
    }
  }

  //이벤트는 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생합니다. 스타일 시트, 이미지, 하위 프레임의 로딩은 기다리지 않습니다.
  document.addEventListener("DOMContentLoaded", () => {
    const carouselElement = get(".carousel");

    const carousel = new Carousel(carouselElement);
    carousel.initCarousel();
    carousel.setEventListeners();
  });
})();
