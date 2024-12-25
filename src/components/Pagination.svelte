<script lang="ts">
     import { createEventDispatcher } from 'svelte';

    interface Props {
        totalPages?: number;
        currentPage?: number;
    }

    let { totalPages = 1, currentPage = 1 }: Props = $props();
const dispatch = createEventDispatcher();

function changePage(page) {
    dispatch('pageChange', page);
}
</script>

<div class="pagination">
    {#if currentPage > 1}
        <button onclick={() => changePage(currentPage - 1)}>&laquo; Prev</button>
    {/if}

    {#each Array(totalPages) as _, i}
        <button onclick={() => changePage(i + 1)} class="{currentPage === i + 1 ? 'active' : ''}">{i + 1}</button>
    {/each}

    {#if currentPage < totalPages}
        <button onclick={() => changePage(currentPage + 1)}>Next &raquo;</button>
    {/if}
</div>

<style>
    .pagination {
        display: flex;
        gap: 8px;
        margin: 16px 0;
    }

    button {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
    }

    button.active {
        background-color: #4a90e2;
        color: #fff;
    }
</style>
