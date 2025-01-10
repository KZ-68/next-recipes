import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import PrivacyPoliciesPage from "../app/privacy/page";

describe("Privacy Policies Page", () => {
  it("check for relevant text", () => {
    const { getByText } = render(<PrivacyPoliciesPage />);

    expect(getByText("1. Collecte des informations personnelles")).toBeInTheDocument();
    expect(getByText("Nous utilisons des cookies pour améliorer votre expérience sur notre site. Les cookies sont de petits fichiers stockés sur votre appareil. Ils nous aident à analyser votre utilisation du site et à personnaliser votre expérience. Vous pouvez gérer ou désactiver les cookies dans les paramètres de votre navigateur.")).toBeInTheDocument();
  });
});