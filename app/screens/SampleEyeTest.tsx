import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ArrowLeft, Eye, CheckCircle } from 'lucide-react-native';
import { RootStackParamList } from '../types/navigation';
import { Colors } from '../constants/Colors';
import { hp, wp } from '../helpers/common';

type EyeTestScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'SampleEyeTest'
>;

interface Props {
    navigation: EyeTestScreenNavigationProp;
}

type TestStep = 'intro' | 'distance' | 'readability' | 'results';

const SampleEyeTest: React.FC<Props> = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState<TestStep>('intro');
    const [testSize, setTestSize] = useState(16);
    const [recommendedSize, setRecommendedSize] = useState<number | null>(null);

    const testSizes = [12, 14, 16, 18, 20, 22, 24];

    const startTest = () => setCurrentStep('distance');
    const proceedToReadability = () => setCurrentStep('readability');
    const selectSize = (size: number) => setTestSize(size);
    const completeTest = () => {
        setRecommendedSize(testSize);
        setCurrentStep('results');
    };

    const renderIntro = () => (
        <View style={styles.content}>
            <View>
                <View style={styles.iconContainer}>
                    <Eye size={64} color={Colors.primary} strokeWidth={2} />
                </View>
                <Text style={styles.introTitle}>Vision Readability Test</Text>
                <Text style={styles.introText}>
                    This test will help us determine the optimal font size and display settings for your eyes.
                </Text>

                <View style={styles.instructionsCard}>
                    <Text style={styles.instructionsTitle}>Before you begin:</Text>
                    <View style={styles.instructionItem}>
                        <CheckCircle size={20} color="#059669" strokeWidth={2} />
                        <Text style={styles.instructionText}>Find a comfortable position</Text>
                    </View>
                    <View style={styles.instructionItem}>
                        <CheckCircle size={20} color="#059669" strokeWidth={2} />
                        <Text style={styles.instructionText}>Hold device at normal reading distance</Text>
                    </View>
                    <View style={styles.instructionItem}>
                        <CheckCircle size={20} color="#059669" strokeWidth={2} />
                        <Text style={styles.instructionText}>Ensure good lighting conditions</Text>
                    </View>
                    <View style={styles.instructionItem}>
                        <CheckCircle size={20} color="#059669" strokeWidth={2} />
                        <Text style={styles.instructionText}>Wear your glasses if you use them</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={startTest} activeOpacity={0.8}>
                <Text style={styles.primaryButtonText}>Start Test</Text>
            </TouchableOpacity>
        </View>
    );

    const renderDistance = () => (
        <View style={styles.content}>
            <View>
                <Text style={styles.stepTitle}>Step 1: Screen Distance</Text>
                <Text style={styles.stepDescription}>
                    Hold your device at a comfortable reading distance. The ideal distance is about an arm's length away.
                </Text>

                <View style={styles.distanceCard}>
                    <Text style={styles.distanceText}>Recommended Distance</Text>
                    <Text style={styles.distanceValue}>40-50 cm</Text>
                    <Text style={styles.distanceSubtext}>Approximately 16-20 inches</Text>
                </View>

                <View style={styles.tipBox}>
                    <Text style={styles.tipBoxText}>
                        Position yourself so you can read this text comfortably without squinting or leaning forward.
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.primaryButton}
                onPress={proceedToReadability}
                activeOpacity={0.8}>
                <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );

    const renderReadability = () => (
        <View style={styles.content}>
            <View>
                <Text style={styles.stepTitle}>Step 2: Font Size Test</Text>
                <Text style={styles.stepDescription}>
                    Select the font size that you can read comfortably without straining your eyes.
                </Text>

                <View style={styles.sampleTextCard}>
                    <Text style={[styles.sampleText, { fontSize: testSize }]}>
                        The quick brown fox jumps over the lazy dog. This sample text helps you determine the most comfortable reading size for your eyes.
                    </Text>
                </View>

                <View style={styles.sizeSelector}>
                    <Text style={styles.sizeSelectorLabel}>Select Font Size:</Text>
                    <View style={styles.sizeButtons}>
                        {testSizes.map((size) => (
                            <TouchableOpacity
                                key={size}
                                style={[styles.sizeButton, testSize === size && styles.sizeButtonActive]}
                                onPress={() => selectSize(size)}
                                activeOpacity={0.7}>
                                <Text style={[styles.sizeButtonText, testSize === size && styles.sizeButtonTextActive]}>
                                    {size}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={completeTest} activeOpacity={0.8}>
                <Text style={styles.primaryButtonText}>Complete Test</Text>
            </TouchableOpacity>
        </View>
    );

    const renderResults = () => (
        <View style={styles.content}>
            <View>
                <View style={styles.successIcon}>
                    <CheckCircle size={64} color="#059669" strokeWidth={2} />
                </View>
                <Text style={styles.resultsTitle}>Test Complete!</Text>
                <Text style={styles.resultsText}>
                    Based on your selections, we recommend the following settings for optimal readability.
                </Text>

                <View style={styles.resultsCard}>
                    <View style={styles.resultItem}>
                        <Text style={styles.resultLabel}>Recommended Font Size</Text>
                        <Text style={styles.resultValue}>{recommendedSize}px</Text>
                    </View>
                    <View style={styles.resultDivider} />
                    <View style={styles.resultItem}>
                        <Text style={styles.resultLabel}>Screen Distance</Text>
                        <Text style={styles.resultValue}>40-50 cm</Text>
                    </View>
                </View>
            </View>

            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => setCurrentStep('intro')}
                    activeOpacity={0.8}>
                    <Text style={styles.secondaryButtonText}>Retake Test</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.8}>
                    <Text style={styles.primaryButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {currentStep === 'intro' && renderIntro()}
                {currentStep === 'distance' && renderDistance()}
                {currentStep === 'readability' && renderReadability()}
                {currentStep === 'results' && renderResults()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    placeholder: {
        width: 40,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 32,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 32,
        justifyContent: 'space-between'
    },
    iconContainer: {
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#EEF2FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    introTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 12,
    },
    introText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    instructionsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 32,
    },
    instructionsTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    instructionText: {
        fontSize: 14,
        color: '#374151',
        flex: 1,
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 12,
    },
    stepDescription: {
        fontSize: 16,
        color: '#6B7280',
        lineHeight: 24,
        marginBottom: 32,
    },
    distanceCard: {
        backgroundColor: Colors.lightPrimary,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
    },
    distanceText: {
        fontSize: 14,
        color: Colors.secondary,
        marginBottom: 8,
    },
    distanceValue: {
        fontSize: 36,
        fontWeight: '700',
        color: Colors.primary,
        marginBottom: 4,
    },
    distanceSubtext: {
        fontSize: 14,
        color: Colors.info,
    },
    tipBox: {
        backgroundColor: '#FFFBEB',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#F59E0B',
        marginBottom: 32,
    },
    tipBoxText: {
        fontSize: 14,
        color: '#78350F',
        lineHeight: 20,
    },
    sampleTextCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        marginBottom: 32,
        minHeight: 150,
        justifyContent: 'center',
    },
    sampleText: {
        color: '#111827',
        lineHeight: 28,
    },
    sizeSelector: {
        marginBottom: 32,
    },
    sizeSelectorLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
    },
    sizeButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    sizeButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        minWidth: 48,
        alignItems: 'center',
    },
    sizeButtonActive: {
        backgroundColor: Colors.primary,
    },
    sizeButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
    },
    sizeButtonTextActive: {
        color: '#FFFFFF',
    },
    successIcon: {
        alignSelf: 'center',
        marginBottom: 24,
    },
    resultsTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 12,
    },
    resultsText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    resultsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        marginBottom: 32,
    },
    resultItem: {
        alignItems: 'center',
    },
    resultLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 8,
    },
    resultValue: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.primary,
    },
    resultDivider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 20,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    primaryButton: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        minWidth:'40%'
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    secondaryButton: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        flex: 1,
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.primary,
    },
});

export default SampleEyeTest;
