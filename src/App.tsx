import React from "react";
import { useState } from "react";
import Intro from "./components/Intro/Intro";
import ByDescription from "./components/ByDescription/ByDescription";
import ByParty from "./components/ByParty/ByParty";
import ByPolitician from "./components/ByPolitician/ByPolitician";
import ByProvider from "./components/ByProvider/ByProvider";
import ByUF from "./components/ByUF/ByUF";
import End from "./components/End/End";
import ByAvgDescription from "./components/ByAvgDescription/ByAvgDescription";
import Total from "./components/Total/Total";

import MoneyRain from "./components/MoneyRain/MoneyRain";
import data from "./files/data.json";
import "./styles/default.scss";

enum Screens {
  INTRO,
  TOTAL_AMOUNT,
  BY_DESCRIPTION,
  BY_PARTY,
  BY_POLITICIAN,
  BY_PROVIDER,
  BY_UF,
  AVG_DESCRIPTION,
  END
}

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screens>(Screens.INTRO);

  return (
    <div className="globalWrapper">
      <header className="App-header">
        <MoneyRain />

        {renderComponent()}
      </header>
    </div>
  );

  function renderComponent() {
    const switchScreen = {
      [Screens.INTRO]: () => (
        <Intro handleNext={() => handleNext(Screens.BY_DESCRIPTION)} />
      ),
      [Screens.BY_DESCRIPTION]: () => (
        <ByDescription
          data={data["totalByDesc"]}
          handleNext={() => handleNext(Screens.BY_PARTY)}
        />
      ),
      [Screens.BY_PARTY]: () => (
        <ByParty
          data={data["totalByParty"]}
          handleNext={() => handleNext(Screens.BY_POLITICIAN)}
        />
      ),
      [Screens.BY_POLITICIAN]: () => (
        <ByPolitician
          data={data["totalByPolitician"]}
          handleNext={() => handleNext(Screens.BY_PROVIDER)}
        />
      ),
      [Screens.BY_PROVIDER]: () => (
        <ByProvider
          data={data["totalByProvider"]}
          handleNext={() => handleNext(Screens.BY_UF)}
        />
      ),
      [Screens.BY_UF]: () => (
        <ByUF
          data={data["totalByUF"]}
          handleNext={() => handleNext(Screens.AVG_DESCRIPTION)}
        />
      ),
      [Screens.AVG_DESCRIPTION]: () => (
        <ByAvgDescription
          data={data["totalByAvgDesc"]}
          handleNext={() => handleNext(Screens.TOTAL_AMOUNT)}
        />
      ),
      [Screens.TOTAL_AMOUNT]: () => (
        <Total
          data={data["overview"]}
          handleNext={() => handleNext(Screens.END)}
        />
      ),
      [Screens.END]: () => <End handleNext={() => handleNext(Screens.INTRO)} />
    };

    return screen === Screens.INTRO ||
      screen === Screens.END ||
      !switchScreen[screen] ? (
      (switchScreen[screen] || switchScreen[Screens.END])()
    ) : (
      <div className="content">{switchScreen[screen]()}</div>
    );
  }

  function handleNext(next: Screens) {
    setScreen(next);
    window.scrollTo(0, 0);
  }
};

export default App;
