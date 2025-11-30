import { Component, h } from '@stencil/core';

@Component({
  tag: 'test-component',
  styleUrl: 'test-component.css',
  shadow: true,
})
export class TestComponent {
  render() {
    return (
      <div class="test-wrapper">
        <h2>Test Component Working!</h2>
        <p>If you can see this, the component system is working.</p>
        <div class="test-notice">
          Bible360 Components Test
        </div>
      </div>
    );
  }
}