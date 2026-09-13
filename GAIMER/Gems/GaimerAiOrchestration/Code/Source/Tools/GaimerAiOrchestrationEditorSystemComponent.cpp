
#include <AzCore/Serialization/SerializeContext.h>
#include "GaimerAiOrchestrationEditorSystemComponent.h"

#include <GaimerAiOrchestration/GaimerAiOrchestrationTypeIds.h>

namespace GaimerAiOrchestration
{
    AZ_COMPONENT_IMPL(GaimerAiOrchestrationEditorSystemComponent, "GaimerAiOrchestrationEditorSystemComponent",
        GaimerAiOrchestrationEditorSystemComponentTypeId);

    void GaimerAiOrchestrationEditorSystemComponent::Reflect(AZ::ReflectContext* context)
    {
        if (auto serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
        {
            serializeContext->Class<GaimerAiOrchestrationEditorSystemComponent, AZ::Component>();
        }
    }

    GaimerAiOrchestrationEditorSystemComponent::GaimerAiOrchestrationEditorSystemComponent()
    {
        if (GaimerAiOrchestrationInterface::Get() == nullptr)
        {
            GaimerAiOrchestrationInterface::Register(this);
        }
    }

    GaimerAiOrchestrationEditorSystemComponent::~GaimerAiOrchestrationEditorSystemComponent()
    {
        if (GaimerAiOrchestrationInterface::Get() == this)
        {
            GaimerAiOrchestrationInterface::Unregister(this);
        }
    }

    void GaimerAiOrchestrationEditorSystemComponent::GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided)
    {
        provided.push_back(AZ_CRC_CE("GaimerAiOrchestrationEditorService"));
    }

    void GaimerAiOrchestrationEditorSystemComponent::GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible)
    {
        incompatible.push_back(AZ_CRC_CE("GaimerAiOrchestrationEditorService"));
    }

    void GaimerAiOrchestrationEditorSystemComponent::GetRequiredServices([[maybe_unused]] AZ::ComponentDescriptor::DependencyArrayType& required)
    {
    }

    void GaimerAiOrchestrationEditorSystemComponent::GetDependentServices([[maybe_unused]] AZ::ComponentDescriptor::DependencyArrayType& dependent)
    {
    }

    void GaimerAiOrchestrationEditorSystemComponent::Activate()
    {
        GaimerAiOrchestrationRequestBus::Handler::BusConnect();
    }

    void GaimerAiOrchestrationEditorSystemComponent::Deactivate()
    {
        GaimerAiOrchestrationRequestBus::Handler::BusDisconnect();
    }

} // namespace GaimerAiOrchestration
