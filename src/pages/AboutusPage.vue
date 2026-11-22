<template>
  <div class="column bg-white text-grey-10" style="min-height: 100vh; overflow-x: hidden">
    <div class="full-width">
      <img
        src="@/assets/image_aboutus1_sushi.jpg"
        alt="Sushiro Storefront"
        style="width: 100%; max-height: 660px; object-fit: cover; display: block"
      />
    </div>

    <main class="col q-mx-auto text-center q-px-lg q-py-xl" style="max-width: 860px">
      <h1 class="text-h4 text-weight-bolder text-italic text-red-8 q-mt-md q-mb-sm">
        COMMUNITY REVIEW SUSHIRO
      </h1>

      <p class="text-subtitle1 text-weight-medium text-italic text-grey-9 q-mb-xl">
        "แหล่งรวมรีวิวเมนูซูชิ SUSHIRO จากผู้บริโภคจริง เพื่อช่วยให้คุณตัดสินใจเลือกเมนูที่ใช่สำหรับคุณ"
      </p>

      <p class="text-body1 text-grey-7 q-mb-lg" style="line-height: 1.8">
        เราได้รวบรวมรีวิวเมนูซูชิหลากหลายรายการมาไว้ให้คุณในที่เดียว ถ่ายทอดทุกรายละเอียดทั้งรสชาติ ความสดใหม่
        และความคุ้มค่า เพื่อให้คุณเลือกเมนูที่ถูกใจได้ง่ายขึ้นก่อนเริ่มต้นมื้ออร่อย
      </p>

      <p class="text-body1 text-grey-7 q-mb-xl" style="line-height: 1.8">
        นับตั้งแต่วันแรกที่เดินทางมาถึงไทย การเติบโตของพวกเราเกิดขึ้นได้เพราะรอยยิ้มและการต้อนรับที่อบอุ่นของทุกคน
        พวกเราขอขอบคุณจากหัวใจ และพร้อมจะตั้งใจทำมื้ออร่อยให้ทุกคนต่อไป
      </p>

      <div class="flex justify-center q-mt-lg q-mb-md">
        <img
          src="@/assets/image_aboutus2_sushi.jpg"
          alt="Sushiro Highlights"
          style="width: 100%; max-width: 680px; height: auto"
        />
      </div>
    </main>
    <h3 class="text-center q-px-md" style="margin-bottom: 60px">ผู้พัฒนาเว็บไซต์</h3>

    <!-- jj-->
    <section class="full-width q-px-lg q-pb-xl">
      <div class="q-mx-auto" style="max-width: 900px">
        <div class="row items-center q-col-gutter-xl">
          <div class="col-12 col-sm-4 flex justify-center">
            <img
              src="@/assets/image_aboutusjj_sushi.jpg"
              alt="Sushi Review"
              class="shadow-3"
              style="
                width: 100%;
                max-width: 250px;
                height: auto;
                border-radius: 12px;
                display: block;
              "
            />
          </div>

          <div class="col-12 col-sm-8 dev-info text-body1 text-grey-8">
            <p class="text-weight-bold text-red-8 q-mb-sm">นาย ธนาพล ถาวรมาศ</p>
            <p class="q-mb-sm">ผู้พัฒนาในส่วนของ MainLayout</p>
            <p class="q-mb-sm">ผู้พัฒนาในส่วนของ ReviewPage</p>
            <p class="q-mb-sm">ผู้พัฒนาในส่วนของ Role/Permission</p>
          </div>
        </div>
      </div>
    </section>

    <!-- kim-->
    <section class="full-width q-px-lg q-pb-xl">
      <div class="q-mx-auto" style="max-width: 900px">
        <div class="row items-center q-col-gutter-xl">
          <div class="col-12 col-sm-4 flex justify-center">
            <img
              src="@/assets/image_aboutuskim_sushi.jpg"
              alt="Sushi Review"
              class="shadow-3"
              style="
                width: 100%;
                max-width: 250px;
                height: auto;
                border-radius: 12px;
                display: block;
              "
            />
          </div>

          <div class="col-12 col-sm-8 text-left text-body1 text-grey-8">
            <p class="text-weight-bold text-red-8 q-mb-sm">นางสาว ณัฐณิชา ศรีธรรม</p>
            <p class="q-mb-sm">ผู้พัฒนาในส่วนของ MenuPage</p>
            <p class="q-mb-sm">ผู้พัฒนาในส่วนของ ReviewPage</p>
            <p class="q-mb-sm">ผู้พัฒนาในส่วนของ AboutusPage</p>
          </div>
        </div>
      </div>
    </section>

    <!-- pai -->
    <section class="full-width q-px-lg q-pb-xl">
      <div class="q-mx-auto" style="max-width: 900px">
        <div class="row items-center q-col-gutter-xl">
          <div class="col-12 col-sm-4 flex justify-center">
            <img
              src="@/assets/image_aboutuspai_sushi.jpg"
              alt="Sushi Review"
              class="shadow-3"
              style="
                width: 100%;
                max-width: 250px;
                height: auto;
                border-radius: 12px;
                display: block;
              "
            />
          </div>

          <div class="col-12 col-sm-8 dev-info text-body1 text-grey-8">
            <p class="text-weight-bold text-red-8 q-mb-sm">นาย วาที คชลักษ์</p>
            <p class="q-mb-sm">ผู้พัฒนาในส่วนของ LoginPage</p>
            <p class="q-mb-sm">ผู้พัฒนาในส่วนของ MainLayout</p>
            <p class="q-mb-sm">ผู้พัฒนาในส่วนของ MockAPI</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
.dev-info {
  text-align: left;
}
@media (max-width: 599px) {
  .dev-info {
    text-align: center;
  }
}
</style>
