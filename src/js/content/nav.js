import render from "../helpers/render";

export default function(div) {
  const navStyle = `
    display:flex;
    align-items: center;
    height: 48px;
    padding: 0 1rem;
    border-bottom: 1px solid #E1E2EA;
  `;
  const logoStyle = `
    margin-right: 1.5rem;
  `;

  render(
    div,
    /*html*/ `
    <nav style="${navStyle}">
      <div style="${logoStyle}">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none">
          <path d="M1 1H20" stroke="#0018ED" stroke-width="2" stroke-linecap="round"/>
          <path d="M1 7H20" stroke="#0018ED" stroke-width="2" stroke-linecap="round"/>
          <path d="M1 13H20" stroke="#0018ED" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div>
        <svg width="79" height="22" viewBox="0 0 79 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.41555 0.280007L7.21565 10.7696L10.6619 0.280007H14.0221L17.4683 10.7696L20.2684 0.280007H24.684L19.8377 16.5206H15.5298L12.342 7.10795L9.15418 16.5206H4.84633L0 0.280007H4.41555Z" fill="#0018ED"/>
          <path d="M30.2196 15.2929L28.3241 9.88651L26.4287 15.2929H30.2196ZM31.3396 18.5022H25.3086L24.3394 21.3239H19.8377L26.0194 5.08326H30.6288L36.8106 21.3239H32.3089L31.3396 18.5022Z" fill="#0018ED"/>
          <path d="M35.2693 0L39.1895 9.88652L43.1312 0H47.719L40.8695 16.2406H37.5094L30.6815 0H35.2693Z" fill="#0018ED"/>
          <path d="M72.409 6.03099L70.5135 11.4373L68.6181 6.03099H72.409ZM73.529 2.82164H67.498L66.5288 1.14119e-06H62.0271L68.2088 16.2406H72.8182L79 1.14119e-06H74.4983L73.529 2.82164Z" fill="#0018ED"/>
          <path d="M46.8586 21.6733L49.6587 11.1837L53.105 21.6733H56.4652L59.9114 11.1837L62.7115 21.6733H67.1271L62.2808 5.43268H57.9729L54.7851 14.8453L51.5973 5.43268H47.2894L42.4431 21.6733H46.8586Z" fill="#0018ED"/>
        </svg>
      </div>
    </nav>
  `
  );
}
