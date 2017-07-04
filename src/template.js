var listItem = `<li class="item" data-id="{{id}}">
    <div class="user">
        <div class="avatar" ><img src="{{photo_200}}" alt="Avatar" ></div>
        <div class="info">
            <span class="name" aria-hidden="true">{{first_name}}</span>
            <span class="subname" aria-hidden="true">{{last_name}}</span>
        </div>
    </div>
    <div class="switch-button">
        <i class="fa fa-plus switch" aria-hidden="true"></i>
    </div>
</li>`;

export { listItem };
