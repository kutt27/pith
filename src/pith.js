/**
 * Pith JavaScript Framework
 * Ultra-lightweight interactive components
 * Target: Under 2KB minified and gzipped
 * 
 * Philosophy:
 * - Vanilla JavaScript only, no dependencies
 * - Event delegation for efficiency
 * - Progressive enhancement
 * - Modern browsers only (ES6+)
 */

/**
 * Main Pith namespace
 * Contains all interactive functionality
 */
const Pith = (() => {
  'use strict';

  /**
   * Initialize all interactive components
   * Called automatically when DOM is ready
   */
  function init() {
    initDropdowns();
    initTabs();
    initTooltips();
    initToasts();
  }

  /**
   * DROPDOWN COMPONENT
   * Toggles visibility of dropdown menus
   * 
   * Usage:
   * <button data-dropdown-trigger="menu1">Toggle</button>
   * <div data-dropdown="menu1">Content</div>
   */
  function initDropdowns() {
    // Use event delegation on document for efficiency
    // This handles all dropdowns with a single listener
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-dropdown-trigger]');

      if (trigger) {
        // Get the dropdown ID from the trigger
        const dropdownId = trigger.getAttribute('data-dropdown-trigger');
        const dropdown = document.querySelector(`[data-dropdown="${dropdownId}"]`);

        if (dropdown) {
          // Toggle visibility
          const isHidden = dropdown.classList.contains('hidden');

          // Close all other dropdowns first
          closeAllDropdowns();

          if (isHidden) {
            // Show this dropdown
            dropdown.classList.remove('hidden');
            trigger.setAttribute('aria-expanded', 'true');
          }
        }

        // Prevent event from bubbling
        e.stopPropagation();
      } else {
        // Click outside - close all dropdowns
        closeAllDropdowns();
      }
    });
  }

  /**
   * Close all open dropdowns
   * Helper function for dropdown management
   */
  function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    dropdowns.forEach(dropdown => {
      dropdown.classList.add('hidden');
    });

    const triggers = document.querySelectorAll('[data-dropdown-trigger]');
    triggers.forEach(trigger => {
      trigger.setAttribute('aria-expanded', 'false');
    });
  }

  /**
   * TAB COMPONENT
   * Switches between tabbed content panels
   * 
   * Usage:
   * <button data-tab-trigger="tab1" data-tab-group="group1">Tab 1</button>
   * <div data-tab="tab1" data-tab-group="group1">Content 1</div>
   */
  function initTabs() {
    // Event delegation for all tab triggers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-tab-trigger]');

      if (trigger) {
        const tabId = trigger.getAttribute('data-tab-trigger');
        const groupId = trigger.getAttribute('data-tab-group');

        // Hide all tabs in this group
        const allTabs = document.querySelectorAll(`[data-tab][data-tab-group="${groupId}"]`);
        allTabs.forEach(tab => {
          tab.classList.add('hidden');
        });

        // Deactivate all triggers in this group
        const allTriggers = document.querySelectorAll(`[data-tab-trigger][data-tab-group="${groupId}"]`);
        allTriggers.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.removeAttribute('data-active');
        });

        // Show the selected tab
        const selectedTab = document.querySelector(`[data-tab="${tabId}"][data-tab-group="${groupId}"]`);
        if (selectedTab) {
          selectedTab.classList.remove('hidden');
        }

        // Activate the clicked trigger
        trigger.setAttribute('aria-selected', 'true');
        trigger.setAttribute('data-active', '');
      }
    });
  }

  /**
   * TOOLTIP COMPONENT
   * Shows helpful text on hover
   * 
   * Usage:
   * <button data-tooltip="Helpful text">Hover me</button>
   */
  function initTooltips() {
    // Create tooltip element once and reuse it
    const tooltip = document.createElement('div');
    tooltip.className = 'pith-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      background: var(--pith-text);
      color: var(--pith-bg);
      padding: var(--pith-space-xs) var(--pith-space-sm);
      border-radius: var(--pith-radius);
      font-size: 0.875rem;
      pointer-events: none;
      z-index: 1000;
      opacity: 0;
      transition: opacity var(--pith-transition);
    `;
    document.body.appendChild(tooltip);

    // Show tooltip on mouseenter
    document.addEventListener('mouseenter', (e) => {
      const target = e.target.closest('[data-tooltip]');
      if (target) {
        const text = target.getAttribute('data-tooltip');
        tooltip.textContent = text;

        // Position tooltip above the element
        const rect = target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        tooltip.style.opacity = '1';
      }
    }, true);

    // Hide tooltip on mouseleave
    document.addEventListener('mouseleave', (e) => {
      const target = e.target.closest('[data-tooltip]');
      if (target) {
        tooltip.style.opacity = '0';
      }
    }, true);
  }

  /**
   * TOAST COMPONENT
   * Shows temporary notification messages
   *
   * Usage:
   * Pith.toast('Message here', 'success');
   */
  function initToasts() {
    // Create toast container if it doesn't exist
    if (!document.querySelector('.pith-toast-container')) {
      const container = document.createElement('div');
      container.className = 'pith-toast-container';
      container.style.cssText = `
        position: fixed;
        top: var(--pith-space-lg);
        right: var(--pith-space-lg);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: var(--pith-space-sm);
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }
  }

  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {string} variant - The toast type (info, success, warning, danger)
   * @param {number} duration - How long to show the toast in milliseconds
   */
  function toast(message, variant = 'info', duration = 3000) {
    const container = document.querySelector('.pith-toast-container');

    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = 'pith-toast';
    toastEl.textContent = message;
    toastEl.style.cssText = `
      padding: var(--pith-space-md);
      border-radius: var(--pith-radius);
      background: var(--pith-bg);
      border: 1px solid var(--pith-border);
      box-shadow: var(--pith-shadow-lg);
      min-width: 250px;
      max-width: 400px;
      pointer-events: auto;
      animation: toast-slide-in 200ms ease-out;
    `;

    // Apply variant styling
    const variantColors = {
      info: 'var(--pith-info)',
      success: 'var(--pith-success)',
      warning: 'var(--pith-warning)',
      danger: 'var(--pith-danger)'
    };

    if (variantColors[variant]) {
      toastEl.style.borderLeftWidth = '4px';
      toastEl.style.borderLeftColor = variantColors[variant];
    }

    // Add to container
    container.appendChild(toastEl);

    // Auto-remove after duration
    setTimeout(() => {
      toastEl.style.animation = 'toast-slide-out 200ms ease-in';
      setTimeout(() => {
        toastEl.remove();
      }, 200);
    }, duration);

    // Allow manual dismissal by clicking
    toastEl.addEventListener('click', () => {
      toastEl.style.animation = 'toast-slide-out 200ms ease-in';
      setTimeout(() => {
        toastEl.remove();
      }, 200);
    });
  }

  /**
   * DIALOG HELPERS
   * Utility functions for working with native dialog elements
   */

  /**
   * Open a dialog by ID
   * @param {string} dialogId - The ID of the dialog element
   */
  function openDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (dialog && dialog.tagName === 'DIALOG') {
      dialog.showModal();
    }
  }

  /**
   * Close a dialog by ID
   * @param {string} dialogId - The ID of the dialog element
   */
  function closeDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (dialog && dialog.tagName === 'DIALOG') {
      dialog.close();
    }
  }

  /**
   * Initialize dialog close buttons
   * Automatically handles buttons with data-dialog-close attribute
   */
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-dialog-close]');
    if (closeBtn) {
      const dialogId = closeBtn.getAttribute('data-dialog-close');
      if (dialogId) {
        closeDialog(dialogId);
      } else {
        // Close parent dialog if no ID specified
        const dialog = closeBtn.closest('dialog');
        if (dialog) {
          dialog.close();
        }
      }
    }
  });

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already ready
    init();
  }

  // Add toast animations to document
  const style = document.createElement('style');
  style.textContent = `
    @keyframes toast-slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes toast-slide-out {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Public API
  return {
    toast,
    openDialog,
    closeDialog
  };
})();

// Make Pith available globally
if (typeof window !== 'undefined') {
  window.Pith = Pith;
}

