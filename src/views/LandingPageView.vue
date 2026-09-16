<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import HeroSection from '../components/HeroSection.vue'
import ProblemSection from '../components/ProblemSection.vue'
import SolutionSection from '../components/SolutionSection.vue'
import HowItWorksSection from '../components/HowItWorksSection.vue'
import TestimonialSection from '../components/TestimonialSection.vue'
import FAQSection from '../components/FAQSection.vue'
import ClosingSection from '../components/ClosingSection.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    
    <main class="flex-grow">
      <HeroSection />
      <ProblemSection id="program" />
      <SolutionSection id="solusi" />
      <HowItWorksSection id="cara-kerja" />
      <TestimonialSection id="testimoni" />
      <FAQSection id="faq" />
      <ClosingSection />
    </main>

    <Footer />
  </div>
</template>
