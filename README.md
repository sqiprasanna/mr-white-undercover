# Undercover / Mr. White Party Game

A single-page web application for the popular party game "Undercover". This version works entirely in the browser with no backend required.

## Features
- **4-15 Players**: Supports a wide range of group sizes.
- **No Backend**: Uses deterministic seeding via URL parameters to sync roles across devices.
- **Hybrid Play**: Play by passing one phone around or have everyone join on their own devices.
- **QR Code Sharing**: Quickly share the "Room" by having players scan a QR code.
- **Custom Words**: Use your own word pairs or let the game pick random ones.

## How to Play
1. **Setup**: The Host enters the names of all players and selects the number of Undercovers and Mr. Whites.
2. **Join**:
   - **Offline**: Players take turns picking their name from the list on the Host's phone.
   - **Online**: The Host shows the QR code. Players scan it, pick their name on their own phone, and see their secret word.
3. **Reveal**: Everyone taps their "Secret Card" to see their role and word.
4. **Discussion**: Civilians and Undercovers describe their words. Mr. White tries to blend in!
5. **Voting**: After each round, the group votes to eliminate someone. The Host marks them as eliminated on the Game Board.
6. **Win/Loss**:
   - Civilians win if all Undercovers and Mr. Whites are eliminated.
   - Undercovers/Mr. White win if they outnumber or equal the Civilians.

## Deployment to GitHub Pages
1. Create a new repository on GitHub.
2. Upload `index.html`, `style.css`, and `script.js` to the repository.
3. Go to **Settings** > **Pages**.
4. Under **Build and deployment**, set the source to "Deploy from a branch" and select the `main` branch.
5. Click **Save**. Your game will be live at `https://<your-username>.github.io/<repo-name>/`.

## Technical Details
- **Vanilla JS**: No frameworks used.
- **Deterministic Roles**: Roles are assigned using a PRNG (Pseudo-Random Number Generator) seeded with a value passed in the URL. This ensures that even without a server, if everyone has the same URL, they will be assigned the same roles for the same names.
- **QR Code**: Generated using the `qrcodejs` library via CDN.
