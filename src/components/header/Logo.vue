<!-- Logo -->
<template>
  <div id="logo">
    <loading v-if="isloading"/>
    <img ref="headlogo" src="../../assets/img/header/logo.png" alt="">
  </div>
</template>

<script>
import loading from 'components/header/loading';
export default {
  name: 'Logo',
  components: {
    loading,
  },
  data() {
    return {
      isloading:true
    }
  },
  mounted() {
    document.body.style.overflowY = 'hidden';
		this.$refs.headlogo.onload = () => {
			setTimeout(() => {
				this.isloading = false;
				document.body.style.overflowY = '';
			}, 1500)
		}
  }
}

</script>

<style scoped>
  #logo {
    width: 100%;
    height: 100%;
    margin: auto;
    line-height: 60px;
  }

  #logo img {
    height: 50px;
    margin-top: 5px;
  }
  @media screen and (max-width:930px) {
    #logo img {
      padding-left: 1rem;
    }
  }
</style>