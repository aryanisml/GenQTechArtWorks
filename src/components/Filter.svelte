<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let { filters = {} } = $props();
const dispatch = createEventDispatcher();

let selectedFilters = $state({});

function applyFilters() {
    dispatch('filterChange', selectedFilters);
}
</script>

<div class="filter-container">
    <select onchange={(e) => { selectedFilters.style = e.target.value; applyFilters(); }}>
        <option value="">Choose a Style</option>
        {#each filters.styles as style}
            <option value={style}>{style}</option>
        {/each}
    </select>

    <select onchange={(e) => { selectedFilters.medium = e.target.value; applyFilters(); }}>
        <option value="">Choose a Medium</option>
        {#each filters.mediums as medium}
            <option value={medium}>{medium}</option>
        {/each}
    </select>

    <select onchange={(e) => { selectedFilters.size = e.target.value; applyFilters(); }}>
        <option value="">Choose a Size</option>
        {#each filters.sizes as size}
            <option value={size}>{size}</option>
        {/each}
    </select>

    <select onchange={(e) => { selectedFilters.layout = e.target.value; applyFilters(); }}>
        <option value="">Choose a Layout</option>
        {#each filters.layouts as layout}
            <option value={layout}>{layout}</option>
        {/each}
    </select>
</div>

<style>
    .filter-container {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
        flex-wrap: wrap;
    }

    select {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
    }
</style>
