### Version 1.2.3 (26th June 2025)

#### Added
- Added support for Chinese (simplified) and Chinese (Traditional) languages.

---

### Version 1.2.2 (7th May 2025)

#### Fixed
- Updated platform detection for tablets.
- Added width and height attributes for app icon.

---

### Version 1.2.1 (1st August 2024)

#### Fixed
- Fixed an issue where calling `show` immediately after `init` when a network error occurred resulted in an infinite loop.
- Added aria-label for dismiss button.

---

### Version 1.2.0 (10th June 2024)

#### Added
- Supported custom fonts and sizes of title, description and CTA label configured in Suite.

#### Fixed
- Fixed usage of UTM parameters in link creation: in case not all required parameters were found the link doesn't fallback to default campaign structure.

---

### Version 1.1.1 (30th January 2024)

#### Fixed
- Fixed issue with CTA size when banner body contains long text.

---

### Version 1.1.0 (25th January 2024)

#### Added
- Implemented impressions tracking.

#### Fixed
- Fixed CTA styles to limit its max-width.
- Fixed CTA click behaviour when banner is implemented in iframe.

---

### Version 1.0.2 (13th December 2023)

#### Fixed
- Fixed issue with wrong banner position among other sibling elements when attached to a custom `bannerParent`.
- Fixed banner styles to avoid unintentional override by client styles.

---

### Version 1.0.1 (5th December 2023)

#### Fixed
- Fixed issue with invalid URL generated when search query containing question mark ('?') was passed as an iOS deeplink path.

---

### Version 1.0.0 (23rd November 2023)

The first release of a new Adjust Smart Banner SDK!

#### Added
- Three sizes of banner: small, medium and large.
- Banner custom colors and images support.
- Automatic detection of browser language and ability to force SDK to show banners in chosen language.
- Placement conditions support: choose pages where show banners.
- UTM parameters passing to campaign parameters.
- Dynamic deeplinks.
