
#pragma once
#include <AzCore/Component/Component.h>
#include <GaimerAiOrchestration/GaimerAiOrchestrationBus.h>


namespace GaimerAiOrchestration
{
    /// System component for GaimerAiOrchestration editor
    class GaimerAiOrchestrationEditorSystemComponent
        : public GaimerAiOrchestrationRequestBus::Handler
        , public AZ::Component
    {
    public:
        AZ_COMPONENT_DECL(GaimerAiOrchestrationEditorSystemComponent);

        static void Reflect(AZ::ReflectContext* context);

        GaimerAiOrchestrationEditorSystemComponent();
        ~GaimerAiOrchestrationEditorSystemComponent();

    private:
        static void GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided);
        static void GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible);
        static void GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required);
        static void GetDependentServices(AZ::ComponentDescriptor::DependencyArrayType& dependent);

        // AZ::Component
        void Activate() override;
        void Deactivate() override;
    };
} // namespace GaimerAiOrchestration
