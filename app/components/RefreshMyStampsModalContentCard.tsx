// --- React hooks
import { useMemo } from "react";

// --- UI components
import { Switch, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";

// --- Utils
import { PlatformGroupSpec, PlatformSpec, PROVIDER_ID } from "@gitcoin/passport-platforms/src/types";

// --- App components
import { RefreshMyStampsSelector } from "../components/RefreshMyStampsSelector";

type RefreshMyStampsModalCardProps = {
  platformGroup: PlatformGroupSpec[];
  selectedProviders: PROVIDER_ID[];
  currentPlatform: PlatformSpec | undefined;
  setSelectedProviders: (providerIds: PROVIDER_ID[]) => void;
};

export const RefreshMyStampsModalContentCard = ({
  platformGroup,
  currentPlatform,
  selectedProviders,
  setSelectedProviders,
}: RefreshMyStampsModalCardProps): JSX.Element => {
  const platformProviders = useMemo(
    () => platformGroup.map((group) => group.providers?.map((provider) => provider.name)).flat(),
    [platformGroup]
  );

  const checked = useMemo(
    () => (selectedProviders || []).some((provider) => platformProviders?.indexOf(provider) !== -1),
    [selectedProviders, platformProviders]
  );

  return (
    <div>
      <Accordion allowToggle>
        <AccordionItem className="py-2 first:border-t-accent-2 first:border-b-accent-2">
          <AccordionButton
            className="items-center justify-between text-white focus:shadow-none"
            _focus={{ outline: "none" }}
          >
            <div className="flex items-center justify-start">
              <img src={currentPlatform?.icon} alt={currentPlatform?.name} className="mr-5 h-11 w-11" />
              <p className="text-left">{currentPlatform?.name}</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <Switch
                data-testid={`switch-${currentPlatform?.name}`}
                value={`${currentPlatform?.name}`}
                colorScheme="purple"
                isChecked={checked}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedProviders((selectedProviders || []).concat(platformProviders));
                  } else {
                    setSelectedProviders(
                      (selectedProviders || []).filter((provider) => platformProviders?.indexOf(provider) === -1)
                    );
                  }
                }}
              />
              <AccordionIcon marginLeft="8px" fontSize="28px" />
            </div>
          </AccordionButton>
          <AccordionPanel borderTop="1px solid #083A40" marginTop="8px" paddingLeft="0" paddingRight="0">
            <RefreshMyStampsSelector
              currentPlatform={currentPlatform}
              currentProviders={platformGroup}
              selectedProviders={selectedProviders}
              setSelectedProviders={setSelectedProviders}
              platformChecked={checked}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
