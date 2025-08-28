<script>
  import { Button } from "$lib/components";
</script>

<section
  class="flex flex-col gap-3 justify-center align-middle m-auto pt-40 max-w-1/2"
>
  <!-- Primary button (your teal) -->
  <Button>Get Started</Button>

  <!-- Secondary button (your gold) -->
  <Button variant="secondary">Sign Up</Button>

  <!-- Different sizes -->
  <Button size="sm">Small</Button>
  <Button size="lg">Large</Button>

  <!-- As a link -->
  <Button href="/signup" variant="secondary">Sign Up</Button>

  <!-- Loading state -->
  <Button loading>Saving...</Button>

  <!-- Outline and ghost variants -->
  <Button variant="outline">Learn More</Button>
  <Button variant="ghost">Cancel</Button>

  <!-- Full width -->
  <Button fullWidth>Submit Form</Button>
</section>
