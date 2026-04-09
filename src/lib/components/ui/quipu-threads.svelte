<script lang="ts">
  interface Strand {
    length: number;
    knots: number[];
    accent?: "teal" | "gold";
  }

  interface Props {
    strands?: Strand[];
    class?: string;
  }

  const defaultStrands = [
    { length: 106, knots: [26, 56, 88], accent: "teal" },
    { length: 138, knots: [34, 78, 118], accent: "gold" },
    { length: 118, knots: [22, 52, 92], accent: "teal" },
  ] satisfies Strand[];

  let { strands = defaultStrands, class: className = "" }: Props = $props();
</script>

<div aria-hidden="true" class={["kw-quipu-cluster", className]}>
  {#each strands as strand, index (`${strand.length}-${index}`)}
    <div
      class={["kw-quipu-strand", strand.accent === "gold" && "kw-quipu-strand--warm"]}
      style={`--kw-quipu-length:${strand.length}px;`}
    >
      {#each strand.knots as knot, knotIndex (`${knot}-${knotIndex}`)}
        <span
          class="kw-quipu-knot"
          style={`--kw-quipu-knot-offset:${knot}px; --kw-quipu-knot-size:${knotIndex === 0 ? 0.9 : 0.74}rem;`}
        ></span>
      {/each}
    </div>
  {/each}
</div>

<style>
  .kw-quipu-cluster {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .kw-quipu-strand {
    position: relative;
    width: 0.95rem;
    height: var(--kw-quipu-length);
    opacity: 0.9;
  }

  .kw-quipu-strand::before {
    content: "";
    position: absolute;
    left: 50%;
    top: -0.4rem;
    height: calc(var(--kw-quipu-length) + 0.5rem);
    width: 2px;
    transform: translateX(-50%);
    border-radius: 999px;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, white 32%, var(--color-primary-300) 68%) 0%,
      color-mix(in srgb, var(--color-primary-700) 74%, var(--color-secondary-300) 26%)
        100%
    );
  }

  .kw-quipu-strand--warm::before {
    background: linear-gradient(
      180deg,
      color-mix(in srgb, white 36%, var(--color-secondary-300) 64%) 0%,
      color-mix(in srgb, var(--color-secondary-600) 74%, var(--color-primary-400) 26%)
        100%
    );
  }

  .kw-quipu-knot {
    position: absolute;
    left: 50%;
    top: var(--kw-quipu-knot-offset);
    width: var(--kw-quipu-knot-size, 0.78rem);
    height: var(--kw-quipu-knot-size, 0.78rem);
    transform: translate(-50%, -50%);
    border-radius: 999px;
    border: 1px solid
      color-mix(in srgb, var(--color-brand-border) 84%, white 16%);
    background:
      radial-gradient(
        circle at 35% 35%,
        color-mix(in srgb, white 72%, var(--color-primary-100) 28%) 0 22%,
        transparent 24%
      ),
      linear-gradient(
        180deg,
        color-mix(in srgb, white 46%, var(--color-primary-100) 54%) 0%,
        color-mix(in srgb, var(--color-primary-300) 62%, var(--color-secondary-100) 38%)
          100%
      );
    box-shadow:
      0 8px 20px -16px color-mix(in oklab, var(--color-primary-950), transparent 30%),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);
  }

  .kw-quipu-strand--warm .kw-quipu-knot {
    background:
      radial-gradient(
        circle at 35% 35%,
        color-mix(in srgb, white 72%, var(--color-secondary-100) 28%) 0 22%,
        transparent 24%
      ),
      linear-gradient(
        180deg,
        color-mix(in srgb, white 44%, var(--color-secondary-100) 56%) 0%,
        color-mix(in srgb, var(--color-secondary-300) 68%, var(--color-primary-100) 32%)
          100%
      );
  }
</style>
