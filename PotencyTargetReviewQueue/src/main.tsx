import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {HeroUIProvider, ToastProvider} from "@heroui/react";
import {BrowserRouter} from "react-router-dom";
import { ModuleRegistry } from "ag-grid-community";
import { AllEnterpriseModule, LicenseManager } from "ag-grid-enterprise";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

ModuleRegistry.registerModules([AllEnterpriseModule]);

LicenseManager.setLicenseKey("Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-086540}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{North_Coast_Testing_Laboratories,_LLC}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{LIMS6000}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{LIMS6000}_need_to_be_licensed___{LIMS6000}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{15_April_2026}____[v3]_[0102]_MTc3NjIwNzYwMDAwMA==da791ff453dfa9254deb998a527fcf03");

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(

      <BrowserRouter basename="/react/PTRQ">
          <HeroUIProvider>
              <ToastProvider />
              <QueryClientProvider client={queryClient}>
                  <App />
              </QueryClientProvider>
          </HeroUIProvider>
      </BrowserRouter>

)