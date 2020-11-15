<!-- AppFooter -->
<template>
  <div class="footer">
    <section>
      {{friendShipLinks}}<br/><br/>
      &copy; 豫ICP备 <a href="http://beian.miit.gov.cn/">2020025683</a> 号
    </section>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      friendShipLinks:'',
      // record:'Codejay Blog All Rights Reserved 2020-2021 豫ICP 备2020025683号'
    }
  }
}

</script>

<style scoped> 
  .footer {
    height: 100px;
    width: 100%;
    
    background: #2d3237;
    color: rgba(255, 255, 255, 0.5);
    position: relative;

    
    bottom: 0;
  }

  .footer section {
    max-width: 1200px;
    height: 100%;

    margin: auto;
    padding:15px 10px;

    font-size: 12.5px;
    text-align: center;
  }

  section a:hover{
    color: #9966ff;
  }
</style>