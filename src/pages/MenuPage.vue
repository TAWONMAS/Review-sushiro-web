<template>
  <div class="column bg-white text-grey-10" style="min-height: 100vh; overflow-x: hidden">
    <header class="flex flex-center q-py-xl q-px-md">
      <div class="row items-center q-gutter-sm text-h4 text-weight-bolder text-italic">
        <span>📖</span>
        <span class="text-red-8" style="letter-spacing: 1px">SUSHIRO</span>
        <span>เมนู</span>
      </div>
    </header>

    <main class="col relative-position flex justify-center items-start q-px-lg q-pb-xl">
      <div
        class="gt-xs"
        style="
          position: absolute;
          bottom: 0;
          left: 0;
          width: 220px;
          height: 440px;
          background: linear-gradient(135deg, #c62828, #9e1b1b);
          clip-path: polygon(0 25%, 100% 0, 100% 100%, 0% 100%);
        "
      ></div>
      <div
        class="gt-xs"
        style="
          position: absolute;
          bottom: 0;
          right: 0;
          width: 220px;
          height: 440px;
          background: linear-gradient(135deg, #c62828, #9e1b1b);
          clip-path: polygon(0 0, 100% 25%, 100% 100%, 0% 100%);
        "
      ></div>

      <div
        class="relative-position full-width flex justify-center"
        style="z-index: 1; max-width: 900px"
      >
        <img src="@/assets/image_menu_sushi.jpg" alt="Sushiro Menu" class="full-width shadow-3" />
      </div>
    </main>
  </div>
</template>

<script setup></script>
