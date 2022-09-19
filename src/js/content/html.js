
const color = "#222";

const pageStyle = /*css*/`
  position: absolute;
  background: #fff;
  color: ${color};
  padding: 100px;
  width: 800px;
  height: 1000px;
  transform-origin: 0 0;
`;
const h1 = /*css*/`
  font-size: 64px;
  font-weight: normal;
  line-height: 1.1;
  margin: 0.25em 0;
  letter-spacing: -0.025em;
  color: ${color};
`;
const h2 = /*css*/`
  font-size: 32px;
  font-weight: normal;
  color: ${color};
`;
const h5 = /*css*/`
  font-size: 16px;
  text-transform: none;
  font-weight: normal;
  color: ${color};
`;
const lead = /*css*/`
  font-size: 32px;
  margin: 0 0 0.5em;
  color: ${color};
`;
const p = /*css*/`
  font-size: 21px;
  line-height: 1.6;
  color: ${color};
`;
const quote = /*css*/`
  font-size: 24px;
  color: ${color};
`;
const li = /*css*/`
  font-size: 21px;
  color: ${color};
`;

export const html = /*html*/ `
  <div class="svg" style="${pageStyle}">
    <h5 style="${h5}">First Principles</h5>
    <h1 style="${h1}">Typography exists to honor content</h1>
    <p style="${lead}">Like oratory, music, dance, calligraphy - like anything that lends its grace to language - typography is an art that can be deliberately misused. It is a craft by which the meanings of a text (or its absence of meaning) can be clarified, honored and shared, or knowingly disguised. </p>
    <p style="${p}">In a world rife with unsolicited messages, typography must often draw attention to itself before it will be read. Yet in order to be read, it must relinquish the attention it has drawn. Typography with anything to say therefore aspires to a kind of statuesque transparency. Its other traditional goal is durability: not immunity to change, but a clear superiority to fashion.</p>
    <blockquote style="${quote}">
      Typography at its best is a visual form of language linking timelessness and time. 
    </blockquote>
    <h2 style="${h2}">Durable Typography</h2>
    <p style="${p}">One of the principles of durable typography is always legibility; another is something more than legibility: some earned or unearned interest that gives its living energy to the page. It takes various forms and goes by various names, including serenity, liveliness, laughter, grace and joy...</p>
    <ul>
      <li style="${li}">Legibility</li>
      <li style="${li}">Interest</li>
      <li style="${li}">Liveliness</li>
    </ul>
  </div>
`;
