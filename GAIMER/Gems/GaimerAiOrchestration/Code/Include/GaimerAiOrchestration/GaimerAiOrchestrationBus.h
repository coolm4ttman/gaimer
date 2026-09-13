
#pragma once

#include <GaimerAiOrchestration/GaimerAiOrchestrationTypeIds.h>

#include <AzCore/EBus/EBus.h>
#include <AzCore/Interface/Interface.h>

namespace GaimerAiOrchestration
{
    class GaimerAiOrchestrationRequests
    {
    public:
        AZ_RTTI(GaimerAiOrchestrationRequests, GaimerAiOrchestrationRequestsTypeId);
        virtual ~GaimerAiOrchestrationRequests() = default;
        // Put your public methods here
    };

    class GaimerAiOrchestrationBusTraits
        : public AZ::EBusTraits
    {
    public:
        //////////////////////////////////////////////////////////////////////////
        // EBusTraits overrides
        static constexpr AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;
        static constexpr AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
        //////////////////////////////////////////////////////////////////////////
    };

    using GaimerAiOrchestrationRequestBus = AZ::EBus<GaimerAiOrchestrationRequests, GaimerAiOrchestrationBusTraits>;
    using GaimerAiOrchestrationInterface = AZ::Interface<GaimerAiOrchestrationRequests>;

} // namespace GaimerAiOrchestration
