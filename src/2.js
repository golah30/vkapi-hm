console.log('hi hi hi');
var template = {
  listItem: `{{#each items}}
<div class="item">
    <div class="title">{{title}}</div>
</div>
{{/each}}`
};

export { template };
