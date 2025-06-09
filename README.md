# Turbo Transition

A “minion” for Turbo-Frames and Streams. This custom element transitions elements as they enter or leave the DOM.

**Sponsored By [Rails Designer](https://railsdesigner.com/)**

<a href="https://railsdesigner.com/" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Rails-Designer/turbo-transition/HEAD/.github/logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Rails-Designer/turbo-transition/HEAD/.github/logo-light.svg">
    <img alt="Rails Designer" src="https://raw.githubusercontent.com/Rails-Designer/turbo-transition/HEAD/.github/logo-light.svg" width="240" style="max-width: 100%;">
  </picture>
</a>

Want to be able to understand this JavaScript code? 😊 👉 [JavaScript for Rails Developers](https://javascriptforrails.com/)


## Installation

```bash
# Using importmap
bin/importmap pin turbo-transition

# Using npm
npm install turbo-transition
```

Then add to your JavaScript entrypoint (`app/javascript/application.js`):

```javascript
import "turbo-transition"
```


## Usage

Turbo Transition works by wrapping your elements in a `<turbo-transition>` element and applying CSS classes at the right moments. Use it to transition new items sliding into lists, fade out deleted content, or any other transition effect with CSS. Each `<turbo-transition>` element must contain exactly one child element.

The element watches for two lifecycle events:

- **enter**: when the element is added to the DOM;
- **leave**: when the element is removed from the DOM.


### Enter

```erb
<%# app/views/tasks/create.turbo_stream.erb %>
<%= turbo_stream.append "tasks" do %>
  <turbo-transition
    enter-from-class="fade-enter-from"
    enter-active-class="fade-enter-active"
    enter-to-class="fade-enter-to"
  >
    <%= render partial: "task", locals: {task: @task} %>
  </turbo-transition>
<% end %>
```


### Leave

```erb
<turbo-transition
  id="<%= dom_id(task) %>"
  leave-from-class="fade-leave-from"
  leave-active-class="fade-leave-active"
  leave-to-class="fade-leave-to"
>
  <div>
    <%= task.title %>
    <%= button_to "Delete", task, method: :delete %>
  </div>
</turbo-transition>
```


### Example CSS

```css
.fade-enter-active, .fade-leave-active { transition: opacity 300ms ease-out; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }
```


## Contributing

```bash
# Install dev dependencies
npm install

# Run basic test
npm test

# Release new version
npm version patch # or minor, or major
npm publish
git push
git push --tags
```


## License

Turbo Transition is released under the MIT License.
