export const style = /*html*/ `
<style>
    .wavma {
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    height: 100%;
    z-index: 999999999;
    background-color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    box-shadow: 0 0 20px -5px rgba(0, 0, 0, 0.1);
    transform: translateZ(0);
    color: #4a4c5e;
    font-size: 14px;
    margin: 0;
    }
    .wavma-nav,
    .wavma-options {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    .wavma-nav *,
    .wavma-options * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
    }
    .wavma-export {
    margin-right: 8px;
    }

    .wavma-main {
    display: flex;
    height: calc(100% - 48px);
    }
    .wavma-options {
    height: 100%;
    width: 280px;
    flex: 0 0 280px;
    margin: 0;
    overflow: auto;
    border-right: 1px solid #e1e2ea;
    }
    .wavma-options__reload-button {
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 36px;
    border-radius: 4px;
    }
    .wavma-options__reload-button:hover {
    cursor: pointer;
    background: #f4f4f5;
    }
    .wavma-options__reload-button-icon {
    margin-left: auto;
    }
    .wavma-options__reload-button-icon.rotate {
    animation: rotate360 650ms ease-in-out;
    }
    @keyframes rotate360 {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }

    .wavma #svg svg {
    position: relative;
    transform-origin: 0px 0px;
    }

    .wavma h5 {
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 10px;
    color: #8b8a93;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    line-height: 1;
    font-weight: 500;
    margin: 24px 0 12px;
    }
    .wavma-help {
    display: flex;
    align-items: center;
    margin-right: 0.25rem;
    height: 36px;
    padding: 0 0.5rem;
    border-radius: 4px;
    }
    .wavma-help:hover {
    cursor: pointer;
    background: #f4f4f5;
    }
    .wavma-label {
    display: flex;
    align-items: center;
    height: 36px;
    padding: 0 0.5rem;
    border-radius: 4px;
    font-size: 14px;
    font-weight: normal;
    margin: 0;
    color: #0018ed;
    }
    .wavma-label svg {
    margin-left: 8px;
    }
    .wavma-label:hover {
    cursor: pointer;
    background: #f4f4f5;
    }
    .wavma-alert {
    position: absolute;
    top: 8px;
    z-index: 1;
    background: #fff;
    width: 300px;
    border: 1px solid #ff5b20;
    right: 8px;
    border-radius: 2px;
    }
    .wavma-alert h5 {
    margin: 0;
    }
    .wavma-alert p {
    margin: 8px 0 0;
    }
    .wavma-alert__close {
    position: absolute;
    top: 8px;
    right: 12px;
    }
    .wavma-alert__close:hover {
    cursor: pointer;
    }
    .wavma-alert__close path {
    transition: stroke 350ms ease-out;
    }
    .wavma-alert__close:hover path {
    stroke: #4a4c5e;
    }
    .wavma-alert__content {
    padding: 24px;
    }
    .wavma-alert__details {
    display: flex;
    padding: 24px;
    border-top: 1px solid #edeef2;
    }

    .wavma .font-list {
    padding: 0 16px;
    }

    .wavma .fonts,
    .wavma .colors {
    padding: 0;
    margin: 0;
    list-style: none;
    }
    .wavma .colors {
    padding-bottom: 32px;
    }

    .wavma .wavma-font,
    .wavma .color {
    padding: 8px 8px;
    margin: 0 -8px 1px;
    border-radius: 4px;
    font-size: 14px;
    line-height: normal;
    }
    .wavma-font:hover,
    .color:hover {
    cursor: pointer;
    background: #f4f4f5;
    }
    .wavma-font span {
    color: #8b8a93;
    }
    .wavma-font.is-active {
    cursor: default;
    background: #f4f4f5;
    }

    .wavma .color {
    display: flex;
    }
    .wavma .color__swatch {
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 10px;
    margin: 0;
    margin-left: auto;
    }
</style>
`;