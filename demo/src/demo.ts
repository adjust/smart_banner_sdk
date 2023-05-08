import { AdjustSmartBanner } from '@adjustcom/smart-banner-sdk';

console.log(AdjustSmartBanner);

AdjustSmartBanner.init({
  appToken: "abc123def",
  logLevel: 'verbose'
})

const div = document.createElement('div');
div.innerText = 'WHOA!';
document.body.appendChild(div);
