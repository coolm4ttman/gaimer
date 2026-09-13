
#include <AzCore/Serialization/SerializeContext.h>

#include "GaimerSandboxSystemComponent.h"

#include <GaimerSandbox/GaimerSandboxTypeIds.h>

namespace GaimerSandbox
{
    AZ_COMPONENT_IMPL(GaimerSandboxSystemComponent, "GaimerSandboxSystemComponent",
        GaimerSandboxSystemComponentTypeId);

    void GaimerSandboxSystemComponent::Reflect(AZ::ReflectContext* context)
    {
        if (auto serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
        {
            serializeContext->Class<GaimerSandboxSystemComponent, AZ::Component>()
                ->Version(0)
                ;
        }
    }

    void GaimerSandboxSystemComponent::GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided)
    {
        provided.push_back(AZ_CRC_CE("GaimerSandboxService"));
    }

    void GaimerSandboxSystemComponent::GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible)
    {
        incompatible.push_back(AZ_CRC_CE("GaimerSandboxService"));
    }

    void GaimerSandboxSystemComponent::GetRequiredServices([[maybe_unused]] AZ::ComponentDescriptor::DependencyArrayType& required)
    {
    }

    void GaimerSandboxSystemComponent::GetDependentServices([[maybe_unused]] AZ::ComponentDescriptor::DependencyArrayType& dependent)
    {
    }

    GaimerSandboxSystemComponent::GaimerSandboxSystemComponent()
    {
        if (GaimerSandboxInterface::Get() == nullptr)
        {
            GaimerSandboxInterface::Register(this);
        }
    }

    GaimerSandboxSystemComponent::~GaimerSandboxSystemComponent()
    {
        if (GaimerSandboxInterface::Get() == this)
        {
            GaimerSandboxInterface::Unregister(this);
        }
    }

    void GaimerSandboxSystemComponent::Init()
    {
    }

    void GaimerSandboxSystemComponent::Activate()
    {
        GaimerSandboxRequestBus::Handler::BusConnect();
    }

    void GaimerSandboxSystemComponent::Deactivate()
    {
        GaimerSandboxRequestBus::Handler::BusDisconnect();
    }
}
