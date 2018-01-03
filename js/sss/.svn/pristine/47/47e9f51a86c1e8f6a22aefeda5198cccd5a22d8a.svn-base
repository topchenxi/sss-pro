<template>
  <div>
    <keep-alive><router-view keep-alive></router-view></keep-alive>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      config: {
        mobile: false,
        sidebar: true
      }
    }
  }
}
</script>

<style lang="scss">
@import '~element-ui/lib/theme-default/index.css';
@import 'src/static/scss/index.scss';
@charset 'utf-8';
html
{
    height: 100%;
    min-height: 100%;

    text-size-adjust: 100%;
    text-rendering: optimizelegibility;
}


body
{
    font: 14px/1.5 'Microsoft YaHei', 'Tahoma', Helvetica, Arial, sans-serif;

    position: relative;

    height: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;

    color: #333;
}

*
{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

input,
textarea,
button
{
    outline: none;
    &:focus
    {
        outline: none;
    }
}

[hidden],
.hidden
{
    display: none;
}

a
{
    text-decoration: none;

    background: transparent;
    &:active,
    &:hover
    {
        outline: 0;
    }
}

img
{
    vertical-align: middle;

    border: 0;
}

table
{
    table-layout: fixed;
    border-spacing: 0;
    border-collapse: collapse;
    tr
    {
        td
        {
            word-break: break-word;
        }
    }
}

textarea
{
    &[disabled],
    &:disabled
    {
        cursor: not-allowed;
    }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
{
    margin: 0;

    appearance: none !important;
}

input[type='number']
{
    appearance: textfield;
}


input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder
{
    color: #999;
}

input:-moz-placeholder,
textarea:-moz-placeholder
{
    color: #999;
}

input::-moz-placeholder,
textarea::-moz-placeholder
{
    color: #999;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder
{
    color: #999;
}

li,
ol,
ul
{
    list-style: none;
}

</style>
