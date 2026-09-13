
#pragma once

#include <GaimerSandbox/GaimerSandboxTypeIds.h>

#include <AzCore/EBus/EBus.h>
#include <AzCore/Interface/Interface.h>

namespace GaimerSandbox
{
    class GaimerSandboxRequests
    {
    public:
        AZ_RTTI(GaimerSandboxRequests, GaimerSandboxRequestsTypeId);
        virtual ~GaimerSandboxRequests() = default;
        // Put your public methods here
    };

    class GaimerSandboxBusTraits
        : public AZ::EBusTraits
    {
    public:
        //////////////////////////////////////////////////////////////////////////
        // EBusTraits overrides
        static constexpr AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;
        static constexpr AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
        //////////////////////////////////////////////////////////////////////////
    };

    using GaimerSandboxRequestBus = AZ::EBus<GaimerSandboxRequests, GaimerSandboxBusTraits>;
    using GaimerSandboxInterface = AZ::Interface<GaimerSandboxRequests>;

} // namespace GaimerSandbox
