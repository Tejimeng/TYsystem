<template>
  <div class="home">
    <!-- 左侧容器 -->
    <div class="left_container">
      <!-- 轮播图部分 -->
      <div class="img_html">
        <div class="img_body">
          <swiper
            :spaceBetween="30"
            :effect="'fade'"
            :autoplay="{
              disableOnInteraction: false,
              delay: 2500,
            }"
            :loop="true"
            :pagination="{
              clickable: true,
            }"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide class="slide"
              ><a href="https://new.qq.com/rain/a/20221219A05WA600"
                ><img
                  src="https://inews.gtimg.com/newsapp_bt/0/15558212989/1000"
              /></a>
              <span class="title">卡塔尔世界杯·综述 | 冬天的童话</span>
              <p class="text">
                新华社多哈12月19日电（记者王浩明、岳东兴、韦骅）被海湾环抱的卡塔尔，冬日宛如盛夏。当盛放的烟花染红了卢赛尔体育场的天空，这个童话故事画上了圆满的句号。
              </p> </swiper-slide
            ><swiper-slide class="slide"
              ><a href="https://www.163.com/dy/article/HP4J431A0529ADMH.html"
                ><img
                  src="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2022%2F1221%2F6eeb8282j00rn8gxf01avd000tf00n5p.jpg&thumbnail=660x2147483647&quality=80&type=jpg"
              /></a>
              <span class="title">央视评2022体育新闻：冬奥会</span>
              <p class="text">
                2022年是体育大年，这一年大赛与各单项世锦赛扎堆，的确很难评选10大新闻，但年初的冬奥会与年末的世界杯，称得上是这一年最值得关注的2项赛事，中国体育也是2022年的主角之一！
              </p></swiper-slide
            ><swiper-slide class="slide"
              ><a href="https://new.qq.com/rain/a/20221218A03TC700"
                ><img
                  src="https://inews.gtimg.com/newsapp_bt/0/15557616140/1000"
              /></a>
              <span class="title">英媒评选世界杯最佳阵容！</span>
              <p class="text">
                在世界杯决赛及季军战前（如今季军战已经结束克罗地亚2-1摩洛哥获胜），英国《天空体育》精选了本届世界杯的最佳26人以及最佳首发阵容。在最佳11人当中，几乎全部来自4强队伍，法国及摩洛哥各占3人，阿根廷及克罗地亚各占2人，余下一人是英格兰的哈里·马奎尔。
              </p></swiper-slide
            ><swiper-slide class="slide"
              ><a href="https://www.sohu.com/a/618808208_114988"
                ><img
                  src="https://p7.itc.cn/q_70/images03/20221219/fbf2a058dcef4c50922cc69d125ba027.jpeg"
              /></a>
              <span class="title"
                >新闻8点见丨阿根廷获世界杯冠军；多批布洛芬运达北京
              </span>
              <p class="text">
                12月19日凌晨，2022年卡塔尔世界杯在卢赛尔体育场落幕。在最终的决赛中，阿根廷以7比5（点球大战4比2）击败卫冕冠军法国，队史第3次获得世界杯冠军。35岁的梅西第5次参加世界杯，在决赛中独中两元，终于捧起大力神杯。
              </p></swiper-slide
            >
          </swiper>
        </div>
      </div>
      <!-- 下方按钮 -->
      <div class="left_bu">
        <div class="san_button">
          <div class="butt"><a href="https://sports.163.com/">更多赛事</a></div>
          <div class="butt"><a href="https://www.163.com/">更多资讯</a></div>
          <div class="butt">
            <a href="https://www.ecut.edu.cn/main.htm">加入我们</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧容器 -->
    <div class="right_container">
      <h3 class="title">热点赛事</h3>
      <ul class="infolist">
        <li>
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="M389.44 768a96.064 96.064 0 0 1 181.12 0H896v64H570.56a96.064 96.064 0 0 1-181.12 0H128v-64h261.44zm192-288a96.064 96.064 0 0 1 181.12 0H896v64H762.56a96.064 96.064 0 0 1-181.12 0H128v-64h453.44zm-320-288a96.064 96.064 0 0 1 181.12 0H896v64H442.56a96.064 96.064 0 0 1-181.12 0H128v-64h133.44z"
            ></path>
          </svg>
          <a
            href="https://sports.163.com/photoview/SBUO0005/171354.html#p=HP3JIOHPSBUO0005NOS"
            >万人空巷!阿根廷夺冠游行 梅西怀抱金杯.</a
          >
        </li>
        <li>
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="m512 863.36 384-54.848v-638.72L525.568 222.72a96 96 0 0 1-27.136 0L128 169.792v638.72l384 54.848zM137.024 106.432l370.432 52.928a32 32 0 0 0 9.088 0l370.432-52.928A64 64 0 0 1 960 169.792v638.72a64 64 0 0 1-54.976 63.36l-388.48 55.488a32 32 0 0 1-9.088 0l-388.48-55.488A64 64 0 0 1 64 808.512v-638.72a64 64 0 0 1 73.024-63.36z"
            ></path>
            <path fill="currentColor" d="M480 192h64v704h-64z"></path>
          </svg>
          <a
            href="https://sports.163.com/photoview/SBUO0005/171352.html#p=HOTV5GQRSBUO0005NOS"
            >尽享这一刻！梅西与妻子孩子开心庆祝.</a
          >
        </li>
        <li>
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="M389.44 768a96.064 96.064 0 0 1 181.12 0H896v64H570.56a96.064 96.064 0 0 1-181.12 0H128v-64h261.44zm192-288a96.064 96.064 0 0 1 181.12 0H896v64H762.56a96.064 96.064 0 0 1-181.12 0H128v-64h453.44zm-320-288a96.064 96.064 0 0 1 181.12 0H896v64H442.56a96.064 96.064 0 0 1-181.12 0H128v-64h133.44z"
            ></path>
          </svg>
          <a href="https://www.163.com/sports/article/HOTSLK2N00059D57.html"
            >姆巴佩面无表情认领金靴奖 这一刻对他太残忍.</a
          >
        </li>
        <li>
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="m512 863.36 384-54.848v-638.72L525.568 222.72a96 96 0 0 1-27.136 0L128 169.792v638.72l384 54.848zM137.024 106.432l370.432 52.928a32 32 0 0 0 9.088 0l370.432-52.928A64 64 0 0 1 960 169.792v638.72a64 64 0 0 1-54.976 63.36l-388.48 55.488a32 32 0 0 1-9.088 0l-388.48-55.488A64 64 0 0 1 64 808.512v-638.72a64 64 0 0 1 73.024-63.36z"
            ></path>
            <path fill="currentColor" d="M480 192h64v704h-64z"></path>
          </svg>
          <a href="https://www.163.com/sports/article/HOUEILKA00059D57.html"
            >今夜属于梅西，未来属于姆巴佩.</a
          >
        </li>
        <li>
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="M389.44 768a96.064 96.064 0 0 1 181.12 0H896v64H570.56a96.064 96.064 0 0 1-181.12 0H128v-64h261.44zm192-288a96.064 96.064 0 0 1 181.12 0H896v64H762.56a96.064 96.064 0 0 1-181.12 0H128v-64h453.44zm-320-288a96.064 96.064 0 0 1 181.12 0H896v64H442.56a96.064 96.064 0 0 1-181.12 0H128v-64h133.44z"
            ></path>
          </svg>
          <a href="https://www.163.com/v/video/VKNN7T1BL.html"
            >洪钢：摩洛哥主帅1错误决定遭遇致命打击.</a
          >
        </li>
        <li>
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="m512 863.36 384-54.848v-638.72L525.568 222.72a96 96 0 0 1-27.136 0L128 169.792v638.72l384 54.848zM137.024 106.432l370.432 52.928a32 32 0 0 0 9.088 0l370.432-52.928A64 64 0 0 1 960 169.792v638.72a64 64 0 0 1-54.976 63.36l-388.48 55.488a32 32 0 0 1-9.088 0l-388.48-55.488A64 64 0 0 1 64 808.512v-638.72a64 64 0 0 1 73.024-63.36z"
            ></path>
            <path fill="currentColor" d="M480 192h64v704h-64z"></path>
          </svg>
          <a href="https://www.163.com/sports/article/HOUCE8TD00059D57.html"
            >梅西的最后一舞，最完美的封神之路.</a
          >
        </li>
        <li>
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="M389.44 768a96.064 96.064 0 0 1 181.12 0H896v64H570.56a96.064 96.064 0 0 1-181.12 0H128v-64h261.44zm192-288a96.064 96.064 0 0 1 181.12 0H896v64H762.56a96.064 96.064 0 0 1-181.12 0H128v-64h453.44zm-320-288a96.064 96.064 0 0 1 181.12 0H896v64H442.56a96.064 96.064 0 0 1-181.12 0H128v-64h133.44z"
            ></path>
          </svg>
          <a href="#">梅西和马拉多纳 就差一座世界杯冠军了.</a>
        </li>
        <li>
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="m512 863.36 384-54.848v-638.72L525.568 222.72a96 96 0 0 1-27.136 0L128 169.792v638.72l384 54.848zM137.024 106.432l370.432 52.928a32 32 0 0 0 9.088 0l370.432-52.928A64 64 0 0 1 960 169.792v638.72a64 64 0 0 1-54.976 63.36l-388.48 55.488a32 32 0 0 1-9.088 0l-388.48-55.488A64 64 0 0 1 64 808.512v-638.72a64 64 0 0 1 73.024-63.36z"
            ></path>
            <path fill="currentColor" d="M480 192h64v704h-64z"></path>
          </svg>
          <a href="#">又有天赋又命硬，难道这就是冠军相？</a>
        </li>
        <li>
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="M389.44 768a96.064 96.064 0 0 1 181.12 0H896v64H570.56a96.064 96.064 0 0 1-181.12 0H128v-64h261.44zm192-288a96.064 96.064 0 0 1 181.12 0H896v64H762.56a96.064 96.064 0 0 1-181.12 0H128v-64h453.44zm-320-288a96.064 96.064 0 0 1 181.12 0H896v64H442.56a96.064 96.064 0 0 1-181.12 0H128v-64h133.44z"
            ></path>
          </svg>
          <a href="#">网易五个月前就签了阿根廷和法国 你以为这只是巧合？</a>
        </li>
        <li>
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="m512 863.36 384-54.848v-638.72L525.568 222.72a96 96 0 0 1-27.136 0L128 169.792v638.72l384 54.848zM137.024 106.432l370.432 52.928a32 32 0 0 0 9.088 0l370.432-52.928A64 64 0 0 1 960 169.792v638.72a64 64 0 0 1-54.976 63.36l-388.48 55.488a32 32 0 0 1-9.088 0l-388.48-55.488A64 64 0 0 1 64 808.512v-638.72a64 64 0 0 1 73.024-63.36z"
            ></path>
            <path fill="currentColor" d="M480 192h64v704h-64z"></path>
          </svg>
          <a href="#">甜蜜一吻！梅西获本届世界杯金球奖 亲吻大力神杯.</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { EffectFade, Navigation, Autoplay, Pagination } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [EffectFade, Navigation, Autoplay, Pagination],
    };
  },
};
</script>
<style lang="less">
#app {
  height: 100%;
}
.home {
  box-sizing: border-box;
  background-size: 100% 100%;
  background-image: url(../assets/images/11111.jpg);
  margin-left: 35px;
  height: 100vh;
  padding-top: 10px;
  display: flex;
  .left_container {
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 680px;
    .img_html {
      margin-left: 30px;
      position: relative;
      width: 700px;
      height: 400px;
      .img_body {
        position: relative;
        height: 100%;
        background: #eee;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 14px;
        color: #000;
        margin: 0;
        padding: 0;
        .swiper {
          width: 100%;
          height: 100%;
          .swiper-slide {
            background-position: center;
            background-size: cover;
            img {
              display: block;
              width: 100%;
            }
          }
        }
        .mySwiper {
          .slide {
            position: relative;
            .title {
              font-family: SimHei;
              font-size: 25px;
              display: block;
              position: absolute;
              left: 1%;
              bottom: 25%;
              // background-color: rgba(204, 204, 204, 0.6);
              // box-shadow:rgb(185, 176, 176) 0px 0px 10px;
              color: #fff;
              z-index: 9999;
            }
            .text {
              position: absolute;
              bottom: 8%;
              text-indent: 2em;
              background-color: rgba(127, 122, 122, 0.3);
              color: rgb(255, 255, 255);
              font-weight: bold;
              z-index: 9999;
            }
          }
        }
      }
    }
    .left_bu {
      position: relative;
      margin-left: 30px;
      // background-color: rgb(134, 119, 119);
      height: 200px;
      width: 700px;
      .san_button {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        .butt {
          border-radius: 50%;
          background: linear-gradient(
            rgba(206, 222, 214, 0.4),
            rgba(214, 163, 171, 0.4),
            rgba(46, 46, 58, 0.8)
          );
          width: 180px;
          height: 150px;
          border: none;
          transition: all 0.3s;
          padding-top: 25px;
          transition: all 0.4s;
          a {
            margin: 0 auto;
            width: 60px;
            letter-spacing: 0.5em;
            // height: 100%;
            display: block;
            color: aliceblue;
            font-size: 25px;
            &:hover {
              color: rgb(235, 250, 215);
            }
          }
          &:hover {
            background: linear-gradient(
              rgba(148, 216, 182, 0.6),
              rgba(105, 102, 133, 0.6),
              rgb(10, 10, 67)
            );
            transform: scale(1.2);
          }
        }
      }
    }
  }
  .right_container {
    // 开启相对定位，使其显示到动画的上层
    position: relative;
    overflow: hidden;
    height: 680px;
    width: 450px;
    background-color: rgba(204, 204, 204, 0.3);
    margin-left: 130px;
    .title {
      height: 30px;
      color: rgb(216, 93, 17);
      margin-top: 10px;
      text-indent: 0.5em;
      text-align: left;
      font-size: 18px;
      padding-bottom: 5px;
      border-bottom: 5px double black;
    }
    .infolist {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 10px;
      li {
        display: flex;
        margin: 0 auto;
        width: 425px;
        padding-bottom: 5px;
        border-bottom: 1px dashed rgb(190, 146, 119);
        .icon {
          color: #fff;
          width: 15px;
          height: 15px;
          margin-right: 10px;
        }
        a {
          font-size: 14px;
          padding-left: 30px;
          color: rgb(223, 207, 207);
          transition: all 0.3s;
          &:hover {
            color: #000;
          }
        }
      }
    }
  }
}
</style>